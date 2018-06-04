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
use App\Entity\EntryTaskGrade;
use App\Entity\EntryTaskSubmission;
use App\Form\EntryTaskType;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class EntryTaskController extends Controller
{

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * EntryTaskController constructor.
     * @param ValidatorInterface $validator
     */
    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    /**
     * @Route("api/entrytasks/{courseId}", name="api_entryTasks_get", methods="GET")
     */
    public function getEntryTask(int $courseId)
    {

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($courseId);

        if (!$course) {
            return new JSONResponse([
                'error_message' => 'Course not found'
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!$course->getIsPublic() && !$course->isAdmin($this->getUser())) {
            return new JSONResponse([
                'error_message' => 'This course is private'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $entryTask = $course->getEntryTask();

        if (!$entryTask) {
            return new JSONResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse(
            $entryTask
        );
    }

    /**
     * @Route("api/entrytasks/submission/user/{courseId}", name="api_entryTasks_submissionForUser", methods="GET")
     */
    public function getEntryTaskSubmissionForUser(int $courseId)
    {
        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($courseId);

        if (!$course) {
            return new JSONResponse([
                'error_message' => 'Course not found'
            ], Response::HTTP_BAD_REQUEST);
        }

        $submission = $this->getDoctrine()
            ->getRepository(EntryTaskSubmission::class)
            ->findOneBy([
                'student' => $this->getUser(),
                'course' => $courseId
            ]);

        if (!$submission) {
            return new JSONResponse([
                'error_message' => 'You have not submitted an application to this course yet'
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse(
            $submission
        );
    }

    /**
     * @Route("api/entrytasks/submission/getall/{courseId}", name="api_entryTasks_submission_getAll", methods="GET")
     */
    public function getEntryTaskSubmissions(int $courseId)
    {

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($courseId);

        if (!$course->isTeacher($this->getUser())) {
            return new JsonResponse([
                'error_message' => 'You do not have the permissions to view the submissions'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $entryTask = $course->getEntryTask();

        if (!$entryTask) {
            return new JsonResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        $submissionsAndGrades = $this->getDoctrine()
            ->getRepository(EntryTaskSubmission::class)
            ->findBy([
                'course' => $course
            ]);

        return new JsonResponse(
            $submissionsAndGrades
        );
    }

    /**
     * @Route("api/entrytasks/submission/{id}", name="api_entryTasks_submission_getFromCourse", methods="GET")
     */
    public function getEntryTaskSubmission(int $id)
    {

        $submission = $submissions = $this->getDoctrine()
            ->getRepository(EntryTaskSubmission::class)
            ->find($id);

        if (!$submission) {
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

        if (!$courseTeacher) {
            return new JsonResponse([
                'error_message' => 'You do not have the permissions to view the submission'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse(
            $submission
        );
    }

    /**
     * @Route("api/entrytasks/grade/{submissionId}", name="api_entryTasks_grade_edit", methods="PUT")
     */
    public function setEntryTaskGrade(int $submissionId, Request $request)
    {

        $submission = $this->getDoctrine()
            ->getRepository(EntryTaskSubmission::class)
            ->find($submissionId);

        if (!$submission) {
            return new JsonResponse([
                'error_message' => 'Entry task submission not found'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseTeacher = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findBy([
                'user' => $this->getUser(),
                'course' => $submission->getCourse(),
                'role' => [RoleInterface::ADMIN, RoleInterface::TEACHER],
                'status' => StatusInterface::ACTIVE
            ]);

        if (!$courseTeacher) {
            return new JsonResponse([
                'error_message' => 'You do not have the permissions to grade the submission'
            ], Response::HTTP_BAD_REQUEST);
        }

        $data = json_decode($request->getContent(), true);

        $submission->setScore($data['score']);

        $errors = $this->validator->validate($submission);

        if (count($errors) > 0) {
            return new JsonResponse([
                'error_message' => $errors->get(0)->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($submission);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully graded an entry task submission'
        ], Response::HTTP_CREATED);
    }
}
