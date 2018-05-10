<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.10
 * Time: 10.52
 */

namespace App\Repository;

use App\Entity\EntryTaskSubmission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;


/**
 * @method EntryTaskSubmission|null find($id, $lockMode = null, $lockVersion = null)
 * @method EntryTaskSubmission|null findOneBy(array $criteria, array $orderBy = null)
 * @method EntryTaskSubmission[]    findAll()
 * @method EntryTaskSubmission[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EntryTaskSubmissionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, EntryTaskSubmission::class);
    }

}