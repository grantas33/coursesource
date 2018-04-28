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
use FOS\UserBundle\Model\UserManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends Controller
{
    /**
     * @var UserManagerInterface
     */
    private $userManager;

    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;
    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var JWTEncoderInterface
     */
    private $jwtEncoder;

    /**
     * UserController constructor.
     * @param UserManagerInterface $userManager
     * @param EventDispatcherInterface $dispatcher
     * @param AuthorizationCheckerInterface $authorizationChecker
     * @param TokenStorageInterface $tokenStorage
     * @param JWTEncoderInterface $jwtEncoder
     */
    public function __construct(UserManagerInterface $userManager, EventDispatcherInterface $dispatcher, AuthorizationCheckerInterface $authorizationChecker, TokenStorageInterface $tokenStorage, JWTEncoderInterface $jwtEncoder)
    {
        $this->userManager = $userManager;
        $this->dispatcher = $dispatcher;
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
        $this->jwtEncoder = $jwtEncoder;
    }


    /**
     * @Route("api/register", name="api_user_register", methods="POST")
     */
    public function registerUser(Request $request)
    {
        $user = $this->userManager->createUser();
        $event = new GetResponseUserEvent($user, $request);
        $this->dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

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
            $this->dispatcher->dispatch(
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
            $this->userManager->updateUser($user);
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

    /**
     * @Route("api/user/current", name="api_user_get_current", methods="GET")
     */
    public function getCurrentUser(){
        if( $this->authorizationChecker->isGranted( 'IS_AUTHENTICATED_FULLY' ) )
        {
            $user = $this->tokenStorage->getToken()->getUser();
            return new JsonResponse(
                $user
            );
        }
        return new JsonResponse([
            'error_message' => 'Cannot retrieve the user'
        ]);
    }

    /**
     * @Route("api/user/{id}", name="api_user_get", methods="GET")
     */
    public function getUser($id){
        $user = $this->userManager->findUserBy(array('id'=>$id));
        if(!$user){
            return new JsonResponse([
                'error_message' => 'No user for id '.$id
            ]);
        }
        return new JsonResponse(
            $user
        );
    }


    public function getToken(User $user)
    {
        try {
            return $this->jwtEncoder
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