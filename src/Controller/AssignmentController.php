<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.16
 * Time: 15.57
 */

namespace App\Controller;

use App\Entity\Assignment;
use App\Entity\AssignmentSubmission;
use App\Entity\Course;
use App\Entity\CourseUser;
use App\Event\AssignmentEvent;
use App\Event\GradeEvent;
use App\Form\AssignmentType;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AssignmentController extends Controller
{
    /**
     * @var EventDispatcherInterface
     */
    private $dispatcher;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * LectureController constructor.
     *
     * @param EventDispatcherInterface $dispatcher
     * @param ValidatorInterface       $validator
     */
    public function __construct(EventDispatcherInterface $dispatcher, ValidatorInterface $validator)
    {
        $this->dispatcher = $dispatcher;
        $this->validator = $validator;
    }

    /**
     * @Route("api/assignments", name="api_assignment_create", methods="POST")
     */
    public function setAssignment(Request $request)
    {
        $assignment = new Assignment();
        $form = $this->createForm(AssignmentType::class, $assignment);
        $data = json_decode($request->getContent(), true);
        $teacher = $this->getDoctrine()->getRepository(CourseUser::class)
            ->findOneBy(
                [
                'user' => $this->getUser(),
                'role' => [RoleInterface::TEACHER, RoleInterface::ADMIN],
                'course' => $data['course'],
                'status' => StatusInterface::ACTIVE
                ]
            );

        if (!$teacher) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have permissions to create this assignment'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $form->submit($data, false);

        if ($form->isSubmitted() && $form->isValid()) {
            $assignment->setTeacher($this->getUser());
            $assignment->setCreationDate();
        } else {
            $errors = array();

            foreach ($form as $child) {
                if (!$child->isValid()) {
                    foreach ($child->getErrors() as $error) {
                        $errors[$child->getName()] = $error->getMessage();
                    }
                }
            }
            return new JsonResponse(
                [
                'error_message' => $errors
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($assignment);
            $em->flush();
            $this->dispatcher->dispatch('assignment.create', new AssignmentEvent($assignment));
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                'error_message' => $e->getMessage(),
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return new JsonResponse(
            [
            'success_message' => 'Successfully created new assignment'
            ],
            Response::HTTP_CREATED
        );
    }

    /**
     * @Route("api/assignments/{id}", name="api_assignment_get", methods="GET")
     */
    public function getAssignment(int $id)
    {
        $assignment = $this->getDoctrine()
            ->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse(
                [
                'error_message' => 'No assignment found for id '. $id
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = $this->getDoctrine()->getRepository(CourseUser::class)
            ->findOneBy(
                [
                'user' => $this->getUser(),
                'course' => $assignment->getCourse(),
                ]
            );

        if (!$user) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have permissions to view this assignment'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        return new JSONResponse(
            [
            $assignment
            ]
        );
    }

    /**
     * @Route("api/assignments/{id}", name="api_assignment_update", methods="PUT")
     */
    public function editAssignment(int $id, Request $request)
    {

        $em = $this->getDoctrine()->getManager();
        $assignment = $em->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse(
                [
                'error_message' => 'No assignment found for id '. $id
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $currentCourse = $assignment->getCourse();

        $form = $this->createForm(AssignmentType::class, $assignment);
        $data = json_decode($request->getContent(), true);
        $teacher = $this->getDoctrine()->getRepository(CourseUser::class)
            ->findOneBy(
                [
                'user' => $this->getUser(),
                'course' => $data['course'],
                'role' => [RoleInterface::ADMIN, RoleInterface::TEACHER],
                'status' => StatusInterface::ACTIVE
                ]
            );

        if (!$teacher || $data['course'] != $currentCourse->getId()) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have permissions to edit this'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $form->submit($data, false);

        if (!($form->isSubmitted() && $form->isValid())) {
            $errors = array();

            foreach ($form as $child) {
                if (!$child->isValid()) {
                    foreach ($child->getErrors() as $error) {
                        $errors[$child->getName()] = $error->getMessage();
                    }
                }
            }

            return new JsonResponse(
                [
                'error_message' => $errors
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $em->persist($assignment);
            $em->flush();
            $this->dispatcher->dispatch('assignment.edit', new AssignmentEvent($assignment));
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                'error_message' => $e->getMessage(),
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return new JsonResponse(
            [
            'success_message' => 'Successfully updated assignment '. $id
            ]
        );
    }

    /**
     * @Route("api/assignments", name="api_assignment_filter", methods="GET")
     */
    public function filterAssignments(Request $request)
    {

        $repository = $this->getDoctrine()->getRepository(Assignment::class);
        $course = $request->query->get('course');
        $teacher = $request->query->get('teacher');
        $is_future = $request->query->get('is_future');

        $user = $this->getDoctrine()->getRepository(CourseUser::class)
            ->findOneBy(
                [
                'user' => $this->getUser(),
                'course' => $course,
                ]
            );

        if (!$user) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have permissions to view the assignments'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $assignments = $repository->filter($course, $teacher, $is_future);

        return new JsonResponse(
            $assignments
        );
    }

    /**
     * @Route("api/assignments/{id}", name="api_assignment_delete", methods="DELETE")
     */
    public function deleteAssignment(int $id)
    {

        $assignment = $this->getDoctrine()
            ->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse(
                [
                'error_message' => 'No assignment found for id '. $id
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $currentCourse = $assignment->getCourse();
        $teacher = $this->getDoctrine()->getRepository(CourseUser::class)
            ->findOneBy(
                [
                'user' => $this->getUser(),
                'course' => $currentCourse,
                'role' => [RoleInterface::ADMIN, RoleInterface::TEACHER],
                'status' => StatusInterface::ACTIVE
                ]
            );

        if (!$teacher) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have permissions to delete this'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $em = $this->getDoctrine()->getManager();
        try {
            $em->remove($assignment);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                'error_message' => $e->getMessage(),
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return new JSONResponse(
            [
            'success_message' => 'Successfully deleted assignment '. $id
            ]
        );
    }

    /**
     * @Route("api/assignments/get/last", name="api_assignment_getLast", methods="GET")
     */
    public function getLastAssignments()
    {

        $userAssignments = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findUserAssignments($this->getUser());

        usort(
            $userAssignments,
            function ($a, $b) {
                return $a['assignment']->getDeadlineDate() >  $b['assignment']->getDeadlineDate();
            }
        );

        return new JsonResponse(
            array_slice($userAssignments, 0, 3)
        );
    }

    /**
     * @Route("api/assignments/{id}/submission", name="api_assignment_setSubmission", methods="PUT")
     */
    public function setAssignmentSubmission(int $id, Request $request)
    {

        $assignment = $this->getDoctrine()
            ->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse(
                [
                'error_message' => 'Assignment not found',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!$assignment->getCourse()->isStudent($this->getUser())) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have the permissions to submit to this assignment',
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        if ($assignment->getDeadlineDate() < new \DateTime('now')) {
            return new JsonResponse(
                [
                'error_message' => 'Submissions to this assignment are closed',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $submission = $this->getDoctrine()
            ->getRepository(AssignmentSubmission::class)
            ->findOneBy(
                [
                'student' => $this->getUser(),
                'assignment' => $id
                ]
            );

        $data = json_decode($request->getContent(), true);

        if (!$submission) {
            $submission = new AssignmentSubmission();
            $submission->setStudent($this->getUser());
            $submission->setAssignment($assignment);
        }

        $submission->setSubmission($data['submission']);
        $submission->setSubmissionDate(new \DateTime('now'));

        $errors = $this->validator->validate($submission);

        if (count($errors) > 0) {
            return new JsonResponse(
                [
                'error_message' => $errors->get(0)->getMessage(),
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($submission);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                'error_message' => $e->getMessage(),
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return new JsonResponse(
            [
            'success_message' => 'Successfully posted a submission to an assignment '.$id
            ]
        );
    }

    /**
     * @Route("api/assignments/{id}/submission", name="api_assignment_getSubmission", methods="GET")
     */
    public function getAssignmentSubmission(int $id)
    {

        $submission = $this->getDoctrine()
            ->getRepository(AssignmentSubmission::class)
            ->findOneBy(
                [
                'student' => $this->getUser(),
                'assignment' => $id
                ]
            );

        return new JsonResponse(
            $submission
        );
    }

    /**
     * @Route("api/assignments/{id}/submissions", name="api_assignment_getSubmissions", methods="GET")
     */
    public function getAssignmentSubmissions(int $id)
    {

        $assignment = $this->getDoctrine()
            ->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse(
                [
                'error_message' => 'Assignment not found',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!$assignment->getCourse()->isTeacher($this->getUser())) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have the permissions to get the submissions for this assignment',
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $submissions = $this->getDoctrine()
            ->getRepository(AssignmentSubmission::class)
            ->findBy(
                [
                'assignment' => $id
                ]
            );

        return new JsonResponse(
            $submissions
        );
    }

    /**
     * @Route("api/assignments/{submissionId}/grade", name="api_assignment_gradeSubmission", methods="PUT")
     */
    public function setAssignmentSubmissionGrade(int $submissionId, Request $request)
    {

        $submission = $this->getDoctrine()
            ->getRepository(AssignmentSubmission::class)
            ->find($submissionId);

        if (!$submission) {
            return new JsonResponse(
                [
                'error_message' => 'Assignment submission not found',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!$submission->getAssignment()->getCourse()->isTeacher($this->getUser())) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have the permissions to grade the submission'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $data = json_decode($request->getContent(), true);

        $submission->setScore($data['score']);
        $submission->setGradingDate(new \DateTime('now'));

        $errors = $this->validator->validate($submission);

        if (count($errors) > 0) {
            return new JsonResponse(
                [
                'error_message' => $errors->get(0)->getMessage(),
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($submission);
            $em->flush();
            $this->dispatcher->dispatch('assignment.grade', new GradeEvent($submission));
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                'error_message' => $e->getMessage(),
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return new JsonResponse(
            [
            'success_message' => 'Successfully graded an assignment submission'
            ]
        );
    }

    /**
     * @Route("api/assignments/{courseId}/submissions/student", name="api_assignment_studentSub", methods="GET")
     */
    public function getAssignmentSubmissionsForStudent(int $courseId)
    {

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($courseId);

        if (!$course) {
            return new JsonResponse(
                [
                'error_message' => 'Course not found',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $submissions = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findStudentAssignmentDiary($course, $this->getUser());

        return new JsonResponse(
            $submissions
        );
    }

    /**
     * @Route("api/assignments/{courseId}/submissions/teacher", name="api_assignment_teacherSub", methods="GET")
     */
    public function getAssignmentSubmissionsForTeacher(int $courseId)
    {

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($courseId);

        if (!$course) {
            return new JsonResponse(
                [
                'error_message' => 'Course not found',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $submissions = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findTeacherAssignmentDiary($course, $this->getUser());

        return new JsonResponse(
            $submissions
        );
    }

    /**
     * @Route("api/assignments/{courseId}/diary", name="api_assignment_diary", methods="GET")
     */
    public function getAssignmentSubmissionDiary(int $courseId)
    {

        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($courseId);

        if (!$course) {
            return new JsonResponse(
                [
                'error_message' => 'Course not found',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!$course->isTeacher($this->getUser())) {
            return new JsonResponse(
                [
                'error_message' => 'You do not have the permissions to view this diary'
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $diary = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findAssignmentDiary($courseId);

        return new JsonResponse(
            $diary
        );
    }
}
