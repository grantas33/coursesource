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
                "id" => 1,
                "title" => 'Retina academy',
                "description" => 'Vividly trying to open your eyes',
                "creationDateManually" => '2018-01-01'
            ],
            [
                "id" => 2,
                "title" => 'NASDAQ CURS',
                "description" => 'For bankers strictly. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                "creationDateManually" => '2017-09-06'
            ],
            [
                "id" => 3,
                "title" => 'Gardener lessons',
                "description" => '',
                "creationDateManually" => '2018-04-08'
            ],
            [
                "id" => 4,
                "title" => 'PHP for dummies',
                "description" => 'PHP is a popular general-purpose scripting language that is especially suited to web development.Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.',
                "creationDateManually" => '2018-03-25'
            ],
            [
                "id" => 5,
                "title" => 'Taiko akademja',
                "description" => 'grači Denvera savladali Kliperse sa 134:115, a Jokić je zabeležio novi tripl-dabl ove sezone (23/11/11). Nagetsi se nalaze u velikoj borbi za plej-of i ukoliko pobede Portland i onda Minesotu, učešće im je zagarantovano.',
                "creationDateManually" => '2017-12-13'
            ],


        ];


        foreach ($courses as $courseData) {
            $course = new Course();

            foreach ($courseData as $key => $value) {
                $method = 'set' . ucfirst($key);

                if (method_exists($course, $method)) {
                    $course->$method($value);
                }
            }

            $manager->persist($course);
            //    temporarily disable auto id generation
            $metadata = $manager->getClassMetaData(get_class($course));
            $metadata->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
        }
        $manager->flush();
    }
}

