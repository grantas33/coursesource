<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function filter($query)
    {

        $qb = $this->createQueryBuilder('u');
           $qb = $qb->where(
               $qb->expr()->like(
                   $qb->expr()->concat(
                       $qb->expr()->concat('u.name', ':space'),
                       'u.surname'
                   ),
                   ':query'
               )
           )
            ->setParameter('query', '%'.$query.'%')
            ->setParameter('space', ' ')
            ->setMaxResults(21)
            ->orderBy('u.name');

        return $qb->getQuery()->getResult();
    }
}
