<?php

namespace App\Repository;

use App\Entity\Assignment;
use App\Entity\Course;
use App\Entity\CourseUser;
use App\Entity\Lecture;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CourseUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method CourseUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method CourseUser[]    findAll()
 * @method CourseUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CourseUserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CourseUser::class);
    }

    public function findUserLectures($user)
    {

        $dt_min = new DateTime("last saturday");
        $dt_min->modify('+2 day');
        $dt_max = clone($dt_min);
        $dt_max->modify('+7 days');

        $qbTeacher = $this->createQueryBuilder('cu');
            $qbTeacher = $qbTeacher->select('l as lecture, cu.role')
            ->innerJoin(Course::class, 'c', 'WITH', 'cu.course = c.id')
            ->innerJoin(Lecture::class, 'l', 'WITH', $qbTeacher->expr()->andX(
                $qbTeacher->expr()->eq('l.course', 'c.id'),
                $qbTeacher->expr()->eq('l.teacher', ':user')
            ))
            ->andWhere('cu.user = :user')
            ->andWhere('cu.status = :activeStatus')
            ->andWhere('cu.role IN (:roles)')
            ->andWhere('l.start_date > :minDate')
            ->andWhere('l.start_date < :maxDate')
            ->setParameters([
                'user' => $user,
                'activeStatus' => StatusInterface::ACTIVE,
                'roles' => [RoleInterface::TEACHER, RoleInterface::ADMIN],
                'minDate' => $dt_min,
                'maxDate' => $dt_max
            ]);

        $qbStudent = $this->createQueryBuilder('cu');
        $qbStudent = $qbStudent->select('l as lecture, cu.role')
            ->innerJoin(Course::class, 'c', 'WITH', 'cu.course = c.id')
            ->innerJoin(Lecture::class, 'l', 'WITH', 'l.course = c.id')
            ->andWhere('cu.user = :user')
            ->andWhere('cu.status = :activeStatus')
            ->andWhere('cu.role IN (:roles)')
            ->andWhere('l.start_date > :minDate')
            ->andWhere('l.start_date < :maxDate')
            ->setParameters([
                'user' => $user,
                'activeStatus' => StatusInterface::ACTIVE,
                'roles' => RoleInterface::STUDENT,
                'minDate' => $dt_min,
                'maxDate' => $dt_max
            ]);

            return array_merge($qbStudent->getQuery()->getResult(), $qbTeacher->getQuery()->getResult());
    }

    public function findUserAssignments($user)
    {
        $dt_min = new DateTime("last saturday");
        $dt_min->modify('+2 day');
        $dt_max = clone($dt_min);
        $dt_max->modify('+7 days');

        $qbTeacher = $this->createQueryBuilder('cu');
        $qbTeacher = $qbTeacher->select('a as assignment, cu.role')
            ->innerJoin(Course::class, 'c', 'WITH', 'cu.course = c.id')
            ->innerJoin(Assignment::class, 'a', 'WITH', $qbTeacher->expr()->andX(
                $qbTeacher->expr()->eq('a.course', 'c.id'),
                $qbTeacher->expr()->eq('a.teacher', ':user')
            ))
            ->andWhere('cu.user = :user')
            ->andWhere('cu.status = :activeStatus')
            ->andWhere('cu.role IN (:roles)')
            ->andWhere('a.deadline_date > :minDate')
            ->andWhere('a.deadline_date < :maxDate')
            ->setParameters([
                'user' => $user,
                'activeStatus' => StatusInterface::ACTIVE,
                'roles' => [RoleInterface::TEACHER, RoleInterface::ADMIN],
                'minDate' => $dt_min,
                'maxDate' => $dt_max
            ]);

        $qbStudent = $this->createQueryBuilder('cu');
        $qbStudent = $qbStudent->select('a as assignment, cu.role')
            ->innerJoin(Course::class, 'c', 'WITH', 'cu.course = c.id')
            ->innerJoin(Assignment::class, 'a', 'WITH', 'a.course = c.id')
            ->andWhere('cu.user = :user')
            ->andWhere('cu.status = :activeStatus')
            ->andWhere('cu.role IN (:roles)')
            ->andWhere('a.deadline_date > :minDate')
            ->andWhere('a.deadline_date < :maxDate')
            ->setParameters([
                'user' => $user,
                'activeStatus' => StatusInterface::ACTIVE,
                'roles' => RoleInterface::STUDENT,
                'minDate' => $dt_min,
                'maxDate' => $dt_max
            ]);

        return array_merge($qbStudent->getQuery()->getResult(), $qbTeacher->getQuery()->getResult());
    }
}
