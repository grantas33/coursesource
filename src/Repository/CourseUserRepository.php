<?php

namespace App\Repository;

use App\Entity\Course;
use App\Entity\CourseUser;
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


    public function findMyCourses($user){

        return $this->createQueryBuilder('course_user')
            ->innerJoin(Course::class, 'c', 'WITH', 'c.id = course_user.course')
            ->select(['c.id', 'c.title', 'c.description', 'c.creation_date',
                'course_user.role','course_user.status', 'course_user.isNotifiable'])
            ->andWhere('course_user.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }
}
