<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.25
 * Time: 17.06
 */

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationType;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use JMS\Serializer\SerializationContext;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends Controller
{


    /**
     * @Route("api/users", name="api_user_create", methods="POST")
     */
    public function setUser(Request $request)
    {
        $userManager = $this->get('fos_user.user_manager');
        $dispatcher = $this->get('event_dispatcher');
        $user = $userManager->createUser();
        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return new JsonResponse([
                'error_message' => $event->getResponse()
            ]);
        }

        $form = $this->createForm(RegistrationType::class, $user);
        $data = json_decode($request->getContent(), true);
        $form->setData($user);
        $form->submit($data);

        if($form->isSubmitted() && $form->isValid()){
            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(
                FOSUserEvents::REGISTRATION_SUCCESS, $event
            );
            $user->setEnabled(true);
        }
        else{
            $errors = array();

            foreach ($form as $child) {
                if (!$child->isValid()) {
                    foreach($child->getErrors() as $error)
                        $errors[$child->getName()] = $error->getMessage();
                }
            }
            return new JsonResponse([
                'error_message' => $errors
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $userManager->updateUser($user);
        }
        catch(\Exception $e){
            return new JsonResponse([
                'error_message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully registered new user'
        ], Response::HTTP_CREATED);

    }

    /**
     * @Route("api/login", name="api_user_login", methods="POST")
     */
    public function loginUser(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];

        $repository = $this->getDoctrine()->getRepository(User::class);

        $user = $repository->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse([
                'error_message' => 'Cannot find user'
            ], Response::HTTP_BAD_REQUEST);
        }

        $isValid = $this->get('security.password_encoder')
            ->isPasswordValid($user, $password);

        if (!$isValid) {
            return new JsonResponse([
                'error_message' => 'Bad credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $this->getToken($user);

        return new JsonResponse([
            'token' => $token
        ]);
    }


    public function getToken(User $user)
    {
        try {
            return $this->get('lexik_jwt_authentication.encoder')
                ->encode([
                    'email' => $user->getEmail(),
                    'exp' => $this->getTokenExpiryDateTime(),
                ]);
        } catch (JWTEncodeFailureException $e) {
            throw new CustomUserMessageAuthenticationException('Failed to encode the token');
        }
    }


    private function getTokenExpiryDateTime()
    {
        $tokenTtl = $this->container->getParameter('lexik_jwt_authentication.token_ttl');
        $now = new \DateTime('now');
        try {
            $now->add(new \DateInterval('PT'.$tokenTtl.'S'));
        } catch (\Exception $e) {
            return $now;
        }
        return $now->format('U');
    }

}