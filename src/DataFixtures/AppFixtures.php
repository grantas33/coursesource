<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.8
 * Time: 17.38
 */

namespace App\DataFixtures;

use App\Entity\Course;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
            $courses = [

    ];
            $manager->persist(new Course(
                "Retina academy", "Vivid eyes",
                DateTime::createFromFormat('Y-m-d', '2018-01-01')
            ));
            $manager->persist(new Course(
            "NASDAQ CURS", "For bankers strictly. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
            DateTime::createFromFormat('Y-m-d', '2018-03-06')
            ));
            $manager->persist(new Course(
            "Bourture", "Vivid eyes",
            DateTime::createFromFormat('Y-m-d', '2018-01-01')
        ));
            $manager->persist(new Course(
            "Retina academy", "Vivid eyes",
            DateTime::createFromFormat('Y-m-d', '2018-01-01')
        ));
            $manager->persist(new Course(
            "Retina academy", "Vivid eyes",
            DateTime::createFromFormat('Y-m-d', '2018-01-01')
        ));

        $manager->flush();
    }
}