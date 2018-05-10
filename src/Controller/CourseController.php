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
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class CourseController extends Controller
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
        $courseUser->setUser($this->getUser());
        $courseUser->setRole(RoleInterface::ADMIN);
        $courseUser->setStatus(StatusInterface::ACTIVE);

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($course);
            $em->flush();

            $courseUser->setCourse($course);
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
     * @Route("api/courses/get/{id}", name="api_course_get", methods="GET")
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

        if(!$course->getIsPublic()){
            $isCourseVisible = $this->getDoctrine()
                ->getRepository(CourseUser::class)
                ->findOneBy(array(
                    'user'=>$this->getUser(),
                    'course'=>$course));

            if(!$isCourseVisible){
                return new JsonResponse([
                    'error_message' => 'No permissions to view course '. $id
                ], Response::HTTP_UNAUTHORIZED);
            }
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

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'role'=>RoleInterface::ADMIN]);

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to edit this course'
            ], Response::HTTP_UNAUTHORIZED);
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
     * @Route("api/courses/my", name="api_course_getMy", methods="GET")
     */
    public function getMyCourses(){
        $courses = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findBy(
                ['user' => $this->getUser()]
            );

        return new JSONResponse(
            $courses
        );
    }

    /**
     * @Route("api/courses/public", name="api_course_getPublic", methods="GET")
     */
    public function getPublicCourses(){
        $courses = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findBy([
                'is_public'=>true
            ]);

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

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'role'=>RoleInterface::ADMIN]);

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to edit this course'
            ], Response::HTTP_UNAUTHORIZED);
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
            ->find($id);

        if(!$course || !$course->getIsPublic()){
            return new JsonResponse([
                'error_message' => 'This course is not open for applications'
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'status'=>StatusInterface::PENDING]);

        if($user){
            return new JsonResponse([
                'error_message' => 'Already submitted an application to this course'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser = new CourseUser();
        $courseUser->setUser($this->getUser());
        $courseUser->setCourse($course);
        $courseUser->setRole(RoleInterface::APPLICANT);
        $courseUser->setStatus(StatusInterface::PENDING);

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

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if(!$course){
            return new JsonResponse([
                'error_message' => 'No course found for id '.$id
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'role'=>RoleInterface::ADMIN]);

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to invite this user'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($data['user_id']);

        if(!$user){
            return new JsonResponse([
                'error_message' => 'User does not exist'
            ], Response::HTTP_BAD_REQUEST);
        }

        $activeUser = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$user,
                'course'=>$course,
                'status'=>StatusInterface::ACTIVE]);

        if($activeUser){
            return new JsonResponse([
                'error_message' => 'User is already enrolled in this course'
            ], Response::HTTP_BAD_REQUEST);
        }

        $invitedUser = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$user,
                'course'=>$course,
                'status'=>StatusInterface::INVITED]);

        if($invitedUser){
            return new JsonResponse([
                'error_message' => 'User is already invited to this course'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser = new CourseUser();
        $courseUser->setUser($user);
        $courseUser->setCourse($course);
        $courseUser->setRole($data['role']);
        $courseUser->setStatus(StatusInterface::INVITED);

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

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if(!$course){
            return new JsonResponse([
                'error_message' => 'No course found for id '.$id
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'role'=>RoleInterface::ADMIN]);

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to accept the submission'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($data['user_id']);

        if(!$user){
            return new JsonResponse([
                'error_message' => 'User does not exist'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$user,
                'course'=>$course,
                'status'=>StatusInterface::PENDING]);

        if(!$courseUser){
            return new JsonResponse([
                'error_message' => 'User does not participate in this course or has not submitted an application'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser->setRole(RoleInterface::STUDENT);
        $courseUser->setStatus(StatusInterface::ACTIVE);

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
            'success_message' => 'Successfully accepted the submission'
        ]);
    }

    /**
     * @Route("api/courses/{id}/acceptinvitation", name="api_course_acceptInvitation", methods="PUT")
     */
    public function acceptInvitation(int $id){

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if(!$course){
            return new JsonResponse([
                'error_message' => 'No course found for id '.$id
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'status'=>StatusInterface::INVITED]);

        if(!$user){
            return new JsonResponse([
                'error_message' => 'No invitation to accept'
            ], Response::HTTP_BAD_REQUEST);
        }

        $user->setStatus(StatusInterface::ACTIVE);

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

    /**
     * @Route("api/courses/{id}/assignrole", name="api_course_assignRole", methods="PUT")
     */
    public function assignRole(int $id, Request $request){

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if(!$course){
            return new JsonResponse([
                'error_message' => 'No course found for id '.$id
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$this->getUser(),
                'course'=>$course,
                'role'=>RoleInterface::ADMIN]);

        if(!$courseAdmin){
            return new JsonResponse([
                'error_message' => 'You do not have the rights to assign roles'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($data['user_id']);

        if(!$user){
            return new JsonResponse([
                'error_message' => 'User does not exist'
            ], Response::HTTP_BAD_REQUEST);
        }

        $adminCount = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->count([
                'course'=>$course,
                'role'=>RoleInterface::ADMIN]);

        if($user == $this->getUser() && $adminCount < 2){
            return new JsonResponse([
                'error_message' => 'You can not assign this role to yourself'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user'=>$user,
                'course'=>$course,
                'status'=>StatusInterface::ACTIVE]);

        if(!$courseUser){
            return new JsonResponse([
                'error_message' => 'User does not participate in this course'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseUser->setRole($data['role']);

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
            'success_message' => 'Successfully assigned role to user'
        ]);
    }

}