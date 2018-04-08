<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.8
 * Time: 17.38
 */

namespace App\DataFixtures;

use App\Entity\Course;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
            $courses = [
                [
                    1, 2, 3, 4, 5
                ],
                [
                    'Retina academy',
                    'NASDAQ CURS',
                    'Gardener lessons',
                    'PHP for dummies',
                    'Taiko akademja'
                ],
                [
                    'Vividly trying to open your eyes',
                    'For bankers strictly. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                    '',
                    'PHP is a popular general-purpose scripting language that is especially suited to web development.Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.',
                    'grači Denvera savladali Kliperse sa 134:115, a Jokić je zabeležio novi tripl-dabl ove sezone (23/11/11). Nagetsi se nalaze u velikoj borbi za plej-of i ukoliko pobede Portland i onda Minesotu, učešće im je zagarantovano. '
                ],
                [
                    '2018-01-01',
                    '2017-09-06',
                    '2018-04-08',
                    '2018-03-25',
                    '2017-12-13'
                ]


    ];
            for($i = 0; $i<5; $i++){
                $course = new Course();
                $course->setId($courses[0][$i]);
                $course->setTitle($courses[1][$i]);
                $course->setDescription($courses[2][$i]);
                $course->setCreationDateManually($courses[3][$i]);

                $manager->persist($course);
                // temporarily disable auto id generation
                $metadata = $manager->getClassMetaData(get_class($course));
                $metadata->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
            }

        $manager->flush();
    }
}