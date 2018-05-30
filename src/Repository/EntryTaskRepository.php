<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.9
 * Time: 13.00
 */

namespace App\Repository;

use App\Entity\EntryTask;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method EntryTask|null find($id, $lockMode = null, $lockVersion = null)
 * @method EntryTask|null findOneBy(array $criteria, array $orderBy = null)
 * @method EntryTask[]    findAll()
 * @method EntryTask[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EntryTaskRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, EntryTask::class);
    }

    public function findLive($courseId)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.course = :courseId')
            ->andWhere('e.deadlineDate > :currentDate')
            ->setParameters([
                'courseId' => $courseId,
                'currentDate' => new \DateTime('now')
            ])
            ->getQuery()
            ->getResult();
    }
}
