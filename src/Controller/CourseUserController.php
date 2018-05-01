<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.1
 * Time: 15.04
 */

namespace App\Controller;


use App\Entity\CourseUser;
use App\Form\CourseUserType;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class CourseUserController extends Controller
{

    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * CourseUserController constructor.
     * @param AuthorizationCheckerInterface $authorizationChecker
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(
        AuthorizationCheckerInterface $authorizationChecker,
        TokenStorageInterface $tokenStorage
    ) {
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
    }


    /**
     * @Route("api/courseusers", name="api_courseuser_create", methods="POST")
     */
    public function setCourseUser(Request $request)
    {
        $courseUser = new CourseUser();
        $form = $this->createForm(CourseUserType::class, $courseUser);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);

        if($form->isSubmitted() && $form->isValid()){
            $courseUser->setUser($this->getCurrentUserId());
            $courseUser->setIsNotifiable(true);
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
            $em = $this->getDoctrine()->getManager();
            $em->persist($courseUser);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully added new course user'
        ], Response::HTTP_CREATED);

    }

    public function getCurrentUserId(){
        if( $this->authorizationChecker->isGranted( 'IS_AUTHENTICATED_FULLY' ) )
        {
            return $this->tokenStorage->getToken()->getUser()->getId();
        }
        throw new CustomUserMessageAuthenticationException('Cannot get current user');
    }
}