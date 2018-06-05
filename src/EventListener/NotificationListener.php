<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.18
 * Time: 11.47
 */

namespace App\EventListener;

use App\Entity\Notification;
use App\Event\AssignmentEvent;
use App\Event\CourseEvent;
use App\Event\GradeEvent;
use App\Event\LectureEvent;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RequestStack;

class NotificationListener extends Controller
{

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * NotificationListener constructor.
     *
     * @param EntityManagerInterface $entityManager
     * @param RequestStack           $requestStack
     */
    public function __construct(EntityManagerInterface $entityManager, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->requestStack = $requestStack;
    }


    public function onLectureCreate(LectureEvent $event)
    {

        $lecture = $event->getLecture();
        $course = $lecture->getCourse();
        $teacher = $lecture->getTeacher();

        $message = "A new lecture \"".$lecture->getTitle()."\" has been posted
                in course ".$course->getTitle()." by ".$teacher->getName()." "
            .$teacher->getSurname();

        $this->createNotificationsForStudents($course, $message);
        $this->entityManager->flush();
    }

    public function onLectureEdit(LectureEvent $event)
    {

        $lecture = $event->getLecture();
        $course = $lecture->getCourse();
        $teacher = $lecture->getTeacher();

        $message = "A lecture \"".$lecture->getTitle()."\" has been edited
                in course ".$course->getTitle()." by ".$teacher->getName()." "
            .$teacher->getSurname();

        $this->createNotificationsForStudents($course, $message);
        $this->entityManager->flush();
    }

    public function onAssignmentCreate(AssignmentEvent $event)
    {

        $assignment = $event->getAssignment();
        $course = $assignment->getCourse();
        $teacher = $assignment->getTeacher();

        $message = "A new assignment \"".$assignment->getTitle()."\" has been posted
                in course ".$course->getTitle()." by ".$teacher->getName()." "
            .$teacher->getSurname();

        $this->createNotificationsForStudents($course, $message);
        $this->entityManager->flush();
    }

    public function onAssignmentEdit(AssignmentEvent $event)
    {

        $assignment = $event->getAssignment();
        $course = $assignment->getCourse();
        $teacher = $assignment->getTeacher();

        $message = "An assignment \"".$assignment->getTitle()."\" has been edited
                in course ".$course->getTitle()." by ".$teacher->getName()." "
            .$teacher->getSurname();

        $this->createNotificationsForStudents($course, $message);
        $this->entityManager->flush();
    }

    public function onCourseJoin(CourseEvent $event)
    {

        $course = $event->getCourse();
        $user = $event->getUser();

        $notification = new Notification();

        $notification->setUser($user);
        $notification->setCourse($course);

        $message = "Congratulations! You have joined the course ".$course->getTitle();

        $notification->setMessage($message);

        $baseUrl = $this->requestStack->getCurrentRequest()->getSchemeAndHttpHost();

        $notification->setLink($baseUrl.'/course/'.$course->getId());
        $notification->setDate(new \DateTime());
        $notification->setIsAcceptable(false);

        $this->entityManager->persist($notification);

        foreach ($course->getCourseUsers() as $courseUser) {
            if ($courseUser->isActiveAdmin() && $courseUser->getUser() != $user) {
                $notification = new Notification();

                $notification->setUser($courseUser->getUser());
                $notification->setCourse($course);

                $message = $user->getName()." ".$user->getSurname()." has joined your course ".$course->getTitle();

                $notification->setMessage($message);
                $notification->setLink($baseUrl.'/course/'.$course->getId());
                $notification->setDate(new \DateTime());
                $notification->setIsAcceptable(false);
                $this->entityManager->persist($notification);
            }
        }
        $this->entityManager->flush();
    }

    public function onCourseInvited(CourseEvent $event)
    {

        $course = $event->getCourse();
        $user = $event->getUser();

        $notification = new Notification();

        $notification->setUser($user);
        $notification->setCourse($course);

        $event->getRole() == 'teacher' ?
        $message = "You are invited to teach in the course ".$course->getTitle()."!"
            :
        $message = "You are invited to enroll in the course ".$course->getTitle()."!";

        $notification->setMessage($message);
        $notification->setDate(new \DateTime());
        $notification->setIsAcceptable(true);

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    public function onCourseAccepted(CourseEvent $event)
    {
        $course = $event->getCourse();
        $user = $event->getUser();

        $notification = $this->entityManager->getRepository(Notification::class)
            ->findOneBy([
                'user' => $user,
                'course' => $course,
                'message' => ["You are invited to teach in the course ".$course->getTitle()."!",
                    "You are invited to enroll in the course ".$course->getTitle()."!"]
            ]);

        if(!$notification) {
            return;
        }

        $notification->setIsSeen(true);
        $this->entityManager->persist($notification);
        $this->entityManager->flush();

    }

    public function onCourseAssignRole(CourseEvent $event)
    {

        $course = $event->getCourse();
        $user = $event->getUser();

        $notification = new Notification();

        $notification->setUser($user);
        $notification->setCourse($course);

        $message = "Your course role has been changed to ".$event->getRole()." in course ".$course->getTitle();

        $notification->setMessage($message);

        $baseUrl = $this->requestStack->getCurrentRequest()->getSchemeAndHttpHost();

        $notification->setLink($baseUrl.'/course/'.$course->getId());
        $notification->setDate(new \DateTime());
        $notification->setIsAcceptable(false);

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    public function onCourseLeave(CourseEvent $event)
    {

        $course = $event->getCourse();
        $user = $event->getUser();

        $notification = new Notification();

        $notification->setUser($user);

        $message = "You have left the course ".$course->getTitle();

        $notification->setMessage($message);
        $notification->setDate(new \DateTime());
        $notification->setIsAcceptable(false);

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    public function onAssignmentGrade(GradeEvent $event)
    {

        $assignmentSubmission = $event->getAssignmentSubmission();
        $grade = $assignmentSubmission->getScore();
        $assignment = $assignmentSubmission->getAssignment();
        $course = $assignment->getCourse();
        $student = $assignmentSubmission->getStudent();

        $notification = new Notification();

        $notification->setUser($student);
        $notification->setCourse($course);

        $message = "You have been graded a ".$grade." for assignment \"".$assignment->getTitle()."\"
        in course ".$course->getTitle();

        $notification->setMessage($message);
        $notification->setDate(new \DateTime());
        $notification->setIsAcceptable(false);

        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    private function createNotificationsForStudents($course, $message)
    {
        foreach ($course->getCourseUsers() as $courseUser) {
            if ($courseUser->isActiveStudent()) {
                $notification = new Notification();

                $notification->setUser($courseUser->getUser());
                $notification->setCourse($course);

                $notification->setMessage($message);
                $notification->setDate(new \DateTime());
                $notification->setIsAcceptable(false);

                $this->entityManager->persist($notification);
            }
        }
    }
}
