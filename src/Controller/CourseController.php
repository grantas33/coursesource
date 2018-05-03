<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.3.30
 * Time: 13.59
 */

namespace App\Controller;
use App\Entity\Course;
use App\Entity\CourseUser;
use App\Entity\User;
use App\Form\CourseType;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


class CourseController extends BaseController implements RoleInterface, StatusInterface
{
    /**
     * @Route("api/courses", name="api_course_create", methods="POST")
     */
    public function setCourse(Request $request)
    {
        $course = new Course();
        $form = $this->createForm(CourseType::class, $course);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);

        if($form->isSubmitted() && $form->isValid()){
            $course->setCreationDate();
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

        $courseUser = new CourseUser();
        $courseUser->setUser($this->getCurrentUserId());
        $courseUser->setRole(RoleInterface::ADMIN);
        $courseUser->setCourseStatus(StatusInterface::ACTIVE);

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($course);
            $em->flush();

            $courseUser->setCourse($course->getId());
            $em->persist($courseUser);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                     'error_message' => $e->getMessage(),
               ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully created new course'
        ], Response::HTTP_CREATED);

    }

    /**
     * @Route("api/courses/{id}", name="api_course_get", methods="GET")
     */
    public function getCourse(int $id)
    {
        $course = null;
        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if (!$course) {
            return new JsonResponse([
                'error_message' => 'No course found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse([
            $course
        ]);
    }

    /**
     * @Route("api/courses/{id}", name="api_course_update", methods="PUT")
     */
    public function editCourse(int $id, Request $request){

        $em = $this->getDoctrine()->getManager();
        $course = $em->getRepository(Course::class)
            ->find($id);

        if (!$course) {
            return new JsonResponse([
                'error_message' => 'No course found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }
        $form = $this->createForm(CourseType::class, $course);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);

        if(!($form->isSubmitted() && $form->isValid())){
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
            $em->persist($course);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully updated course '. $id
        ]);
    }

    /**
     * @Route("api/courses", name="api_course_getAll", methods="GET")
     */
    public function getCourses(){
        $courses = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findAll();

        return new JSONResponse(
            $courses
        );
    }

    /**
     * @Route("api/courses/{id}", name="api_course_delete", methods="DELETE")
     */
    public function deleteCourse(int $id){

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if (!$course) {
            return new JsonResponse([
                'error_message' => 'No course found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        try {
            $em->remove($course);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JSONResponse([
            'success_message' => 'Successfully deleted course '. $id
        ]);
    }

    /**
     * @Route("api/courses/{id}/apply", name="api_course_apply", methods="POST")
     */
    public function applyToCourse(int $id){

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findOneBy(array('id'=>$id));

        if(!$course || !$course->getIsPublic()){
            return new JsonResponse([
                'error_message' => 'This course is not open for applications'
            ], Response::HTTP_BAD_REQUEST);
        }

        $currentUserId = $this->getCurrentUserId();
        $user = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy(array(
                'user'=>$currentUserId,
                'course'=>$id,
                'course_status'=>StatusInterface::PENDING));

        if($user){
            return new JsonResponse([
                'error_message' => 'Already submitted an application to this course'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser = new CourseUser();
        $courseUser->setUser($currentUserId);
        $courseUser->setCourse($id);
        $courseUser->setRole(RoleInterface::APPLICANT);
        $courseUser->setCourseStatus(StatusInterface::PENDING);

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
            'success_message' => 'Successfully sent an application to course '.$id
        ], Response::HTTP_CREATED);
    }

    /**
     * @Route("api/courses/{id}/invite", name="api_course_invite", methods="POST")
     */
    public function inviteToCourse(int $id, Request $request){

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy(array(
                'user'=>$this->getCurrentUserId(),
                'course'=>$id,
                'role'=>RoleInterface::ADMIN));

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to invite this user'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy(array('id'=>$data['user']));

        if(!$user){
            return new JsonResponse([
                'error_message' => 'User does not exist'
            ], Response::HTTP_BAD_REQUEST);
        }

        $activeUser = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy(array(
                'user'=>$data['user'],
                'course_status'=>StatusInterface::ACTIVE));

        if($activeUser){
            return new JsonResponse([
                'error_message' => 'User is already enrolled in the course'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser = new CourseUser();
        $courseUser->setUser($data['user']);
        $courseUser->setCourse($id);
        $courseUser->setRole($data['role']);
        $courseUser->setCourseStatus(StatusInterface::INVITED);

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
            'success_message' => 'Successfully invited user to course '.$id
        ], Response::HTTP_CREATED);

    }

    /**
     * @Route("api/courses/{id}/acceptsubmission", name="api_course_acceptSubmission", methods="PUT")
     */
    public function acceptSubmission(int $id, Request $request){

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy(array(
                'user'=>$this->getCurrentUserId(),
                'course'=>$id,
                'role'=>RoleInterface::ADMIN));

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to accept the submission'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $user = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy(array(
                'user'=>$data['user'],
                'course'=>$id,
                'course_status'=>StatusInterface::PENDING));

        if(!$user){
            return new JsonResponse([
                'error_message' => 'User does not exist or has not submitted an application'
            ], Response::HTTP_BAD_REQUEST);
        }

        $user->setRole(RoleInterface::STUDENT);
        $user->setCourseStatus(StatusInterface::ACTIVE);

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully accepted the submission'
        ]);
    }

    /**
     * @Route("api/courses/{id}/acceptinvitation", name="api_course_acceptInvitation", methods="PUT")
     */
    public function acceptInvitation(int $id){

        $user = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy(array(
                'user'=>$this->getCurrentUserId(),
                'course'=>$id,
                'course_status'=>StatusInterface::INVITED));

        if(!$user){
            return new JsonResponse([
                'error_message' => 'No invitation to accept'
            ], Response::HTTP_BAD_REQUEST);
        }

        $user->setCourseStatus(StatusInterface::ACTIVE);

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully accepted invitation to course '.$id
        ]);
    }

}