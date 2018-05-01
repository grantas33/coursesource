<?php

namespace App\Repository;

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
}