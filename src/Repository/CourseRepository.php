<?php

namespace App\Repository;

use App\Entity\Course;
use App\Entity\CourseUser;
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

    public function findBrowseCourses($courses)
    {

        $query = $this->createQueryBuilder('c');
          $query = $query->add('where', $query->expr()->notIn('c.id', ':courses'))
            ->andWhere('c.is_public = :true')
            ->setParameters([
                'courses' => $courses,
                'true' => true
            ])
            ->getQuery();
        return $query->getResult();
    }


}
