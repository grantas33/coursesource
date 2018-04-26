<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.25
 * Time: 17.06
 */

namespace App\Controller;

use App\Form\RegistrationType;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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
        //    var_dump((string) $form->getErrors(true));
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

}