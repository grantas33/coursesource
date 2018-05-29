<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.10
 * Time: 22.34
 */

namespace App\Repository;

use App\Entity\EntryTaskGrade;
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

    public function findSubmissionsAndGrades($courseId)
    {
        $qb =  $this->createQueryBuilder('s');

        $qb->leftJoin(
            EntryTaskGrade::class,
            'g',
            'WITH',
            $qb->expr()->andX(
                $qb->expr()->eq('s.student', 'g.student'),
                $qb->expr()->eq('s.course', 'g.course')
            )
        )
            ->select(['s as submission', 'g.score', 'g.gradingDate'])
            ->andWhere('s.course = :courseId')
            ->setParameters(
                [
                'courseId' => $courseId,
                ]
            );

        return $qb->getQuery()->getResult();
    }
}
