<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.8
 * Time: 17.38
 */

namespace App\DataFixtures;

use App\Entity\Assignment;
use App\Entity\Course;
use App\Entity\Lecture;
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
                "creationDateManually" => '2018-01-01',
                "isPublic" => false
            ],
            [
                "id" => 2,
                "title" => 'NASDAQ CURS',
                "description" => 'For bankers strictly. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                "creationDateManually" => '2017-09-06',
                "isPublic" => true
            ],
            [
                "id" => 3,
                "title" => 'Gardener lessons',
                "description" => '',
                "creationDateManually" => '2018-04-08',
                "isPublic" => false
            ],
            [
                "id" => 4,
                "title" => 'PHP for dummies',
                "description" => 'PHP is a popular general-purpose scripting language that is especially suited to web development.Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.',
                "creationDateManually" => '2018-03-25',
                "isPublic" => false
            ],
            [
                "id" => 5,
                "title" => 'Taiko akademja',
                "description" => 'grači Denvera savladali Kliperse sa 134:115, a Jokić je zabeležio novi tripl-dabl ove sezone (23/11/11). Nagetsi se nalaze u velikoj borbi za plej-of i ukoliko pobede Portland i onda Minesotu, učešće im je zagarantovano.',
                "creationDateManually" => '2017-12-13',
                "isPublic" => false
            ],


        ];

        $lectures = [
            [
                'id' => 1,
                'title' => 'Pots and flowers',
                'description' => '',
                'teacher' => 4,
                'course' => 3,
                'creationDateManually' => '2018-04-05 9:00:02',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-18 17:00:00'),
                'endDate' => null,
                'preparationTasks' => 'Bring a pot and seeds',
                'location' => 'Kernville 56H, ground floor'
            ],
            [
                'id' => 2,
                'title' => 'Gardening hose basics',
                'description' => 'Gardening is the practice of growing and cultivating plants as part of horticulture. In gardens, ornamental plants are often grown for their flowers, foliage, or overall appearance; useful plants, such as root vegetables, leaf vegetables, fruits, and herbs, are grown for consumption, for use as dyes, or for medicinal or cosmetic use. Gardening is considered by many people to be a relaxing activity.',
                'teacher' => 5,
                'course' => 3,
                'creationDateManually' => '2018-04-05 9:00:02',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-20 19:00:00'),
                'endDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-20 21:05:00'),
                'preparationTasks' => 'Bring a hose',
                'location' => 'Kernville 56H, ground floor'
            ],
            [
                'id' => 3,
                'title' => 'Herbs',
                'description' => 'The Middle Age represented a period of decline in gardens for aesthetic purposes, with regard to gardening. After the fall of Rome, gardening was done for the purpose of growing medicinal herbs and/or decorating church altars. Monasteries carried on a tradition of garden design and intense horticultural techniques during the medieval period in Europe. Generally, monastic garden types consisted of kitchen gardens, infirmary gardens, cemetery orchards, cloister garths and vineyards. Individual monasteries might also have had a "green court", a plot of grass and trees where horses could graze, as well as a cellarer\'s garden or private gardens for obedientiaries, monks who held specific posts within the monastery.',
                'teacher' => 5,
                'course' => 3,
                'creationDateManually' => '2018-04-05 9:00:02',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-25 13:00:00'),
                'endDate' => null,
                'preparationTasks' => null,
                'location' => 'Kernville 56H, 2nd floor'
            ],
            [
                'id' => 4,
                'title' => 'Herbs part 2',
                'description' => 'In the 18th century, gardens were laid out more naturally, without any walls. This style of smooth undulating grass, which would run straight to the house, clumps, belts and scattering of trees and his serpentine lakes formed by invisibly damming small rivers, were a new style within the English landscape, a "gardenless" form of landscape gardening, which swept away almost all the remnants of previous formally patterned styles. The English garden usually included a lake, lawns set against groves of trees, and often contained shrubberies, grottoes, pavilions, bridges and follies such as mock temples, Gothic ruins, bridges, and other picturesque architecture, designed to recreate an idyllic pastoral landscape.',
                'teacher' => 5,
                'course' => 3,
                'creationDateManually' => '2018-04-05 9:00:02',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-25 17:00:00'),
                'endDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-25 19:30:00'),
                'preparationTasks' => 'Bring fresh ranarr seeds',
                'location' => 'Kernville 56H, 2nd floor'
            ],
            [
                'id' => 5,
                'title' => 'Vines and bugs',
                'description' => 'Gardening also takes place in non-residential green areas, such as parks, public or semi-public gardens (botanical gardens or zoological gardens), amusement parks, along transportation corridors, and around tourist attractions and garden hotels. In these situations, a staff of gardeners or groundskeepers maintains the gardens.',
                'teacher' => 1,
                'course' => 3,
                'creationDateManually' => '2018-04-05 9:00:02',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-27 17:00:00'),
                'endDate' => null,
                'preparationTasks' => null,
                'location' => 'Kernville 58H, room 2A'
            ],
            [
                'id' => 6,
                'title' => 'Optional lecture - mastering hosing',
                'description' => 'Container gardening is concerned with growing plants in any type of container either indoors or outdoors. Common containers are pots, hanging baskets, and planters. Container gardening is usually used in atriums and on balconies, patios, and roof tops.',
                'teacher' => 3,
                'course' => 3,
                'creationDateManually' => '2018-04-05 9:00:02',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-28 15:00:00'),
                'endDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-28 18:00:00'),
                'preparationTasks' => 'Bring a fine hose',
                'location' => 'Kernville 56H, ground floor'
            ],
            [
                'id' => 7,
                'title' => 'Finances introduction',
                'description' => 'A bank is a financial institution that accepts deposits from the public and creates credit.',
                'teacher' => 9,
                'course' => 2,
                'creationDateManually' => '2018-04-07 18:25:22',
                'startDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-21 20:00:00'),
                'endDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-21 21:30:00'),
                'preparationTasks' => null,
                'location' => 'Massascushets office, cabinet 405'
            ],

        ];

        $assignments = [
            [
                'id' => 1,
                'title' => 'Craft a hose',
                'description' => 'Students must craft a hose using 3D rendering software and submit the model file',
                'teacher' => 4,
                'course' => 3,
                'creationDateManually' => '2018-04-05 10:02:00',
                'deadlineDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-19 23:59:59'),
                'isGradeable' => true,
                'isSubmittable' => true
            ],
            [
                'id' => 2,
                'title' => 'Plant a flower and send its picture',
                'description' => 'Students must plant their flower and send a picture with the flower visible',
                'teacher' => 4,
                'course' => 3,
                'creationDateManually' => '2018-04-05 10:02:00',
                'deadlineDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-20 23:59:59'),
                'isGradeable' => true,
                'isSubmittable' => true
            ],
            [
                'id' => 3,
                'title' => 'Complete and submit seed quiz',
                'description' => 'Students must submit the seed quiz',
                'teacher' => 4,
                'course' => 3,
                'creationDateManually' => '2018-04-05 10:02:00',
                'deadlineDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-23 23:59:59'),
                'isGradeable' => true,
                'isSubmittable' => true
            ],
            [
                'id' => 4,
                'title' => 'Dig a hole',
                'description' => 'Students must have a hole to plant seeds',
                'teacher' => 5,
                'course' => 3,
                'creationDateManually' => '2018-04-05 10:02:00',
                'deadlineDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-25 12:59:59'),
                'isGradeable' => false,
                'isSubmittable' => false
            ],
            [
                'id' => 5,
                'title' => 'Application to NASDAQ banking course',
                'description' => 'In order to apply, submit your essay about modern bank infrastructure',
                'teacher' => 9,
                'course' => 2,
                'creationDateManually' => '2018-04-10 10:00:00',
                'deadlineDate' => \DateTime::createFromFormat("Y-m-d H:i:s", '2018-04-14 23:59:59'),
                'isGradeable' => true,
                'isSubmittable' => true
            ],
        ];

        $this->insertToDatabase(get_class(new Course()), $courses, $manager);
        $this->insertToDatabase(get_class(new Lecture()), $lectures, $manager);
        $this->insertToDatabase(get_class(new Assignment()), $assignments, $manager);

        $manager->flush();
    }

    public function insertToDatabase($classType, $array, $manager){
        foreach ($array as $data) {
            $object = new $classType();

            foreach ($data as $key => $value) {
                $method = 'set' . ucfirst($key);

                if (method_exists($object, $method)) {
                    $object->$method($value);
                }
            }

            $manager->persist($object);
            //    temporarily disable auto id generation
            $metadata = $manager->getClassMetaData(get_class($object));
            $metadata->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
        }
    }
}

