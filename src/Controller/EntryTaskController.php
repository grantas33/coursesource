<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.9
 * Time: 13.21
 */

namespace App\Controller;


use App\Entity\Course;
use App\Entity\CourseUser;
use App\Entity\EntryTask;
use App\Entity\EntryTaskSubmission;
use App\Form\EntryTaskType;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EntryTaskController extends Controller
{
    /**
     * @Route("api/entrytasks/{courseId}", name="api_entryTasks_get", methods="GET")
     */
    public function getEntryTask(int $courseId){

        $publicCourse = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findOneBy([
               'id'=>$courseId,
               'is_public'=>true,
            ]);

        if(!$publicCourse){
            $courseAdmin = $this->getDoctrine()
                ->getRepository(CourseUser::class)
                ->findOneBy([
                    'course'=>$courseId,
                    'user'=>$this->getUser(),
                    'role'=>RoleInterface::ADMIN,
                    'status'=>StatusInterface::ACTIVE
                ]);
            if(!$courseAdmin) {
                return new JSONResponse([
                    'error_message' => 'This course is private'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }

        $entryTask = $this->getDoctrine()
            ->getRepository(EntryTask::class)
            ->findOneBy([
                'course'=>$courseId,
            ]);

        if(!$entryTask){
            return new JSONResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse(
            $entryTask
        );
    }

    /**
     * @Route("api/entrytasks/{courseId}", name="api_entryTasks_edit", methods="PUT")
     */
    public function editEntryTask(int $courseId, Request $request){

        $em = $this->getDoctrine()->getManager();
        $entryTask = $this->getDoctrine()
            ->getRepository(EntryTask::class)
            ->findOneBy([
                'course'=>$courseId,
            ]);

        if(!$entryTask){
            return new JSONResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'course'=>$courseId,
                'user'=>$this->getUser(),
                'role'=>RoleInterface::ADMIN,
                'status'=>StatusInterface::ACTIVE
            ]);

        if(!$courseAdmin){
            return new JSONResponse([
                'error_message' => 'You cannot edit this entry task'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $form = $this->createForm(EntryTaskType::class, $entryTask);
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
            $em->persist($entryTask);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully updated entry task for course '. $courseId
        ]);
    }

    /**
     * @Route("api/entrytasks/submission/getall/{courseId}", name="api_entryTasks_submission_getAll", methods="GET")
     */
    public function getEntryTaskSubmissions(int $courseId){

        $courseTeacher = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user' => $this->getUser(),
                'course' => $courseId,
                'role' => [RoleInterface::ADMIN, RoleInterface::TEACHER],
                'status' => StatusInterface::ACTIVE
            ]);

        if(!$courseTeacher){
            return new JsonResponse([
                'error_message' => 'You do not have the permissions to view the submissions'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $entryTask = $this->getDoctrine()
            ->getRepository(EntryTask::class)
            ->findOneBy([
                'course'=>$courseId,
            ]);

        if(!$entryTask){
            return new JsonResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        $submissions = $this->getDoctrine()
            ->getRepository(EntryTaskSubmission::class)
            ->findBy([
                'course' => $courseId
            ]);

        return new JsonResponse(
            $submissions
        );
    }

    /**
     * @Route("api/entrytasks/submission/{id}", name="api_entryTasks_submission_getFromCourse", methods="GET")
     */
    public function getEntryTaskSubmission(int $id){

        $submission = $submissions = $this->getDoctrine()
            ->getRepository(EntryTaskSubmission::class)
            ->find($id);

        if(!$submission){
            return new JsonResponse([
                'error_message' => 'Submission not found'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseTeacher = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'user' => $this->getUser(),
                'course' => $submission->getCourse(),
                'role' => [RoleInterface::ADMIN, RoleInterface::TEACHER],
                'status' => StatusInterface::ACTIVE
            ]);

        if(!$courseTeacher){
            return new JsonResponse([
                'error_message' => 'You do not have the permissions to view the submission'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse(
            $submission
        );
    }
}