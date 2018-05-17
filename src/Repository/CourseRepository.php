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

    public function findBrowseCourses($courses, $search, $offset, $limit)
    {

        $query = $this->createQueryBuilder('c');
        $query = $query->andWhere('c.is_public = :true')
            ->andWhere('c.id NOT IN (:courses)')
            ->setParameters([
                'courses' => $courses,
                'true' => true
            ]);
        if($search != ''){
            $query = $query->andWhere('c.title LIKE :search')
                ->setParameter('search', '%'.$search.'%');
        }

        $query = $query->orderBy('c.creation_date', 'DESC')->
        setMaxResults($limit)->setFirstResult($offset)->getQuery();
        return $query->getResult();
    }

    public function findPublicCourses($search, $offset, $limit)
    {

        $query = $this->createQueryBuilder('c');
        $query = $query->andWhere('c.is_public = :true')
            ->setParameter('true', true);

        if($search != ''){
            $query = $query->andWhere('c.title LIKE :search')
                ->setParameter('search', '%'.$search.'%');
        }

        $query = $query->orderBy('c.creation_date', 'DESC')->
        setMaxResults($limit)->setFirstResult($offset)->getQuery();
        return $query->getResult();
    }


}
