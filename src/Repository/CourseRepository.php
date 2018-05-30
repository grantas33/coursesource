<?php

namespace App\Repository;

use App\Entity\Assignment;
use App\Entity\AssignmentSubmission;
use App\Entity\Course;
use App\Entity\CourseUser;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Course|null find($id, $lockMode = null, $lockVersion = null)
 * @method Course|null findOneBy(array $criteria, array $orderBy = null)
 * @method Course[]    findAll()
 * @method Course[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CourseRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Course::class);
    }

    public function findBrowseCourses($courses, $search, $offset, $limit)
    {

        $query = $this->createQueryBuilder('c');
        $query = $query->andWhere('c.is_public = :true')
            ->setParameter('true', true);
        if ($courses) {
            $query = $query->andWhere('c.id NOT IN (:courses)')
                ->setParameter('courses', $courses);
        }

        if ($search != '') {
            $query = $query->andWhere('c.title LIKE :search')
                ->setParameter('search', '%'.$search.'%');
        }

        $query = $query->orderBy('c.creation_date', 'DESC')->
        setMaxResults($limit)->setFirstResult($offset)->getQuery();
        return $query->getResult();
    }

    public function findPublicCourses($search, $offset, $limit)
    {

        $query = $this->createQueryBuilder('c');
        $query = $query->andWhere('c.is_public = :true')
            ->setParameter('true', true);

        if ($search != '') {
            $query = $query->andWhere('c.title LIKE :search')
                ->setParameter('search', '%'.$search.'%');
        }

        $query = $query->orderBy('c.creation_date', 'DESC')->
        setMaxResults($limit)->setFirstResult($offset)->getQuery();
        return $query->getResult();
    }

    public function findAssignmentDiary($course)
    {

        $qb = $this->createQueryBuilder('c')
            ->select('u as student')
            ->innerJoin(Assignment::class, 'a', 'WITH', 'a.course = c.id')
            ->innerJoin(AssignmentSubmission::class, 'sub', 'WITH', 'sub.assignment = a.id')
            ->innerJoin(User::class, 'u', 'WITH', 'sub.student = u.id')
            ->andWhere('c.id = :course')
            ->setParameters([
                'course' => $course
            ]);

        $diary = $qb->getQuery()->getResult();
        foreach ($diary as $key => $stud) {
            $submissions = $this->findStudentAssignmentDiary($course, $stud);
            $diary[$key] = array_merge($diary[$key], $submissions);
        }

        return $diary;
    }

    public function findStudentAssignmentDiary($course, $student)
    {

        $qbSubs = $this->createQueryBuilder('c')
            ->select('sub')
            ->innerJoin(Assignment::class, 'a', 'WITH', 'a.course = c.id')
            ->innerJoin(AssignmentSubmission::class, 'sub', 'WITH', 'sub.assignment = a.id')
            ->andWhere('c.id = :course')
            ->andWhere('sub.student = :student')
            ->setParameters([
                'course' => $course,
                'student' => $student
            ]);

        $qbAvg = $this->createQueryBuilder('c')
            ->select('AVG(sub.score) as average_grade')
            ->innerJoin(Assignment::class, 'a', 'WITH', 'a.course = c.id')
            ->innerJoin(AssignmentSubmission::class, 'sub', 'WITH', 'sub.assignment = a.id')
            ->andWhere('c.id = :course')
            ->andWhere('sub.student = :student')
            ->setParameters([
                'course' => $course,
                'student' => $student
            ]);

          $diary['submissions'] = $qbSubs->getQuery()->getResult();
          $diary = array_merge($diary, $qbAvg->getQuery()->getOneOrNullResult());
          return $diary;
    }

    public function findTeacherAssignmentDiary($course, $teacher)
    {

        $qbSubs = $this->createQueryBuilder('c')
            ->select('sub')
            ->innerJoin(Assignment::class, 'a', 'WITH', 'a.course = c.id')
            ->innerJoin(AssignmentSubmission::class, 'sub', 'WITH', 'sub.assignment = a.id')
            ->andWhere('c.id = :course')
            ->andWhere('a.teacher = :teacher')
            ->setParameters([
                'course' => $course,
                'teacher' => $teacher
            ]);

        return $qbSubs->getQuery()->getResult();
    }
}
