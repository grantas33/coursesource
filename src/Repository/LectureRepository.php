<?php

namespace App\Repository;

use App\Entity\Lecture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Lecture|null find($id, $lockMode = null, $lockVersion = null)
 * @method Lecture|null findOneBy(array $criteria, array $orderBy = null)
 * @method Lecture[]    findAll()
 * @method Lecture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LectureRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Lecture::class);
    }

    /**
     * @return Lecture[] Returns an array of Lecture objects
     */

    public function filter($course, $teacher, $is_future)
    {

        $qb = $this->createQueryBuilder('l')
            ->andWhere('l.course = :course')
            ->setParameter('course', $course);

        if(!empty($teacher)) {
            $qb->andWhere('l.teacher = :teacher')
                ->setParameter('teacher', $teacher);
        }
        if($is_future) {
            $qb->andWhere('l.end_date >= :today')
                ->setParameter('today', new \DateTime('now'));
        }

        return $qb->orderBy('l.start_date', 'ASC')
            ->getQuery()
            ->getResult();
    }



    /*
    public function findOneBySomeField($value): ?Lecture
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
