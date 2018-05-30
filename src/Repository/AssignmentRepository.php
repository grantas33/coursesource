<?php

namespace App\Repository;

use App\Entity\Assignment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Assignment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Assignment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Assignment[]    findAll()
 * @method Assignment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AssignmentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Assignment::class);
    }

    /**
     * @return Assignment[]
     */
    public function filter($course, $teacher, $is_future)
    {

        $qb = $this->createQueryBuilder('a')
            ->andWhere('a.course = :course')
            ->setParameter('course', $course);

        if (!empty($teacher)) {
            $qb->andWhere('a.teacher = :teacher')
                ->setParameter('teacher', $teacher);
        }
        if ($is_future) {
            $qb->andWhere('a.deadline_date >= :today')
                ->setParameter('today', new \DateTime('now'));
        }

        return $qb->orderBy('a.deadline_date', 'ASC')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Assignment[] Returns an array of Assignment objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Assignment
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
