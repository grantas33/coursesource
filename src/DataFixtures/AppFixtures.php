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
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\ClassMetadata;
use Nelmio\Alice\Loader\NativeLoader;

class AppFixtures extends Fixture
{

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * NotificationListener constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    public function load(ObjectManager $manager)
    {

        $courses = [
            [
                'title' => 'Cryptography I',
                'slogan' => 'Cryptography is an indispensable tool for protecting information in computer systems',
                'description' => 'Cryptography is an indispensable tool for protecting information in computer systems. In this course you will learn the inner workings of cryptographic systems and how to correctly use them in real-world applications. The course begins with a detailed discussion of how two parties who have a shared secret key can communicate securely when a powerful adversary eavesdrops and tampers with traffic. We will examine many deployed protocols and analyze mistakes in existing systems. The second half of the course discusses public-key techniques that let two parties generate a shared secret key. Throughout the course participants will be exposed to many exciting open problems in the field and work on fun (optional) programming projects. We will cover more advanced cryptographic tasks such as zero-knowledge, privacy mechanisms, and other forms of encryption.',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'https://1.bp.blogspot.com/-WGni-pJWhgQ/WNFFa1xgAqI/AAAAAAAAII0/Lh_-05Tm5iYQShF0PX9CVXhfao_fW1nOgCLcB/s640/data-protection.jpg',
                'location' => 'Sydney, Australia',
                'startDateManually' => '2018-06-28',
                'scheduleOverview' => 'Lectures on Mondays and Fridays + group project'
            ],
            [
                'title' => 'Programming for Everybody',
                'slogan' => 'Basics of programming computers using Python.',
                'description' => 'This course aims to teach everyone the basics of programming computers using Python. We cover the basics of how one constructs a program from a series of simple instructions in Python.  The course has no pre-requisites and avoids all but the simplest mathematics. Anyone with moderate computer experience should be able to master the materials in this course. This course will cover Chapters 1-5 of the textbook “Python for Everybody”.  Once a student completes this course, they will be ready to take more advanced programming courses. This course covers Python 3.',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'https://www.usnews.com/dims4/USNEWS/0852b9f/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F37%2F17%2Fe98fa74742d6b663b320d4a3e8fe%2F150109-html-stock.jpg',
                'location' => 'Dublin, Ireland',
                'startDateManually' => '2018-06-23',
                'scheduleOverview' => 'Fun group projects on weekdays, guest lectures on weekends'
            ],
            [
                'title' => 'Python Data Structures',
                'slogan' => 'Data structures of the Python programming language.',
                'description' => 'This course will introduce the core data structures of the Python programming language. We will move past the basics of procedural programming and explore how we can use the Python built-in data structures such as lists, dictionaries, and tuples to perform increasingly complex data analysis. This course will cover Chapters 6-10 of the textbook “Python for Everybody”.  This course covers Python 3.',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'http://greenwingshub.com/courses/images/python.jpg',
                'location' => 'Sydney, Australia',
                'startDateManually' => '2018-06-29',
                'scheduleOverview' => 'Lectures on Mondays and Fridays + group project'
            ],
            [
                'title' => 'Algorithms, Part I',
                'slogan' => 'Essential information about algorithms and data structures',
                'description' => 'This course covers the essential information that every serious programmer needs to know about algorithms and data structures, with emphasis on applications and scientific performance analysis of Java implementations. Part I covers elementary data structures, sorting, and searching algorithms. Part II focuses on graph- and string-processing algorithms.',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'https://www.fiqas.nl/wp-content/uploads/2015/10/Sound-of-Data.jpg',
                'location' => 'Frankfurt',
                'startDateManually' => '2018-06-20',
                'scheduleOverview' => 'Lectures by guests at Wednesdays at ~6pm'
            ],
            [
                'title' => 'Bitcoin and Cryptocurrency Technologies',
                'slogan' => 'How does Bitcoin work?',
                'description' => 'How does Bitcoin work? What makes Bitcoin different? How secure are your Bitcoins?
After this course, you’ll know everything you need to be able to separate fact from fiction when reading claims about Bitcoin and other cryptocurrencies. You’ll have the conceptual foundations you need to engineer secure software that interacts with the Bitcoin network. And you’ll be able to integrate ideas from Bitcoin in your own projects.',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'http://cdn2.ubergizmo.com/wp-content/uploads/2014/11/bitcoin-wallet.jpg',
                'location' => 'Vilnius, Lithuania',
                'startDateManually' => '2018-06-28',
                'scheduleOverview' => 'Lectures on Thursdays and Fridays at noon'
            ],
            [
                'title' => 'Game Theory',
                'slogan' => 'Representing games, strategies and the extensive form',
                'description' => 'Popularized by movies such as "A Beautiful Mind," game theory is the mathematical modeling of strategic interaction among rational (and irrational) agents. Beyond what we call `games\' in common language, such as chess, poker, soccer, etc., it includes the modeling of conflict among nations, political campaigns, competition among firms, and trading behavior in markets such as the NYSE. How could you begin to model keyword auctions, and peer to peer file-sharing networks, without accounting for the incentives of the people using them? The course will provide the basics: representing games and strategies, the extensive form (which computer scientists call game trees), Bayesian games (modeling things like auctions), repeated and stochastic games, and more. We\'ll include a variety of examples including classic games and a few applications.',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'http://videogamecritic.com/images/2600/chase_the_chuckwagon.png',
                'location' => 'Kaunas, Lithuania',
                'startDateManually' => '2018-06-28',
                'scheduleOverview' => '5pm - 7pm on Mondays, 6-7 - 9pm on Thursdays'
            ],
            [
                'title' => 'Buddhism and Modern Psychology',
                'slogan' => 'The light of evolutionary psychology',
                'description' => 'This course will examine how Buddhism is faring under this scrutiny. Are neuroscientists starting to understand how meditation “works”? Would such an understanding validate meditation—or might physical explanations of meditation undermine the spiritual significance attributed to it? And how are some of the basic Buddhist claims about the human mind holding up? We’ll pay special attention to some highly counterintuitive doctrines: that the self doesn’t exist, and that much of perceived reality is in some sense illusory. ',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'http://3.bp.blogspot.com/--OxmGa5V30M/UF8-gr6OrwI/AAAAAAAAAMw/z4IMsXkxwJI/s1600/2012-09-21-16-30-33-505c9629a828a-5.jpg',
                'location' => 'Ahmadabad, India',
                'startDateManually' => '2018-06-26',
                'scheduleOverview' => 'Sessions daily, presentations on Fridays'
            ],
            [
                'title' => 'Introduction to Psychology',
                'slogan' => 'The most interesting experiments within the field of psychology',
                'description' => 'This course will highlight the most interesting experiments within the field of psychology, discussing the implications of those studies for our understanding of the human mind and human behavior.  We will explore the brain and some of the cognitive abilities it supports like memory, learning, attention, perception and consciousness.  We will examine human development - both in terms of growing up and growing old - and will discuss the manner in which the behavior of others affect our own thoughts and behavior.  Finally we will discuss various forms of mental illness and the treatments that are used to help those who suffer from them.   ',
                'creationDateManually' => '2018-06-05',
                'isPublic' => true,
                'isSubmittable' => false,
                'avatar' => 'https://www.qhms.com/images-service/psy_intro.jpg',
                'location' => 'Vilnius, Lithuania',
                'startDateManually' => '2018-06-29',
                'scheduleOverview' => 'Monday from 15:00 to 19:00'
            ],
        ];

        $connection = $this->entityManager->getConnection();
        $connection->exec("ALTER TABLE assignment_submission AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE entry_task_submission AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE notification AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE lecture AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE assignment AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE entry_task AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE course_user AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE course AUTO_INCREMENT = 1;");
        $connection->exec("ALTER TABLE user AUTO_INCREMENT = 1;");

        $loader = new NativeLoader();
        $objectSet = $loader->loadFile(__DIR__.'/fixtures.yml')->getObjects();
        foreach ($objectSet as $object) {
            $manager->persist($object);
        }

        $manager->flush();

        $this->insertToDatabase(get_class(new Course()), $courses, $manager);

        $manager->flush();
    }

    public function insertToDatabase($classType, $array, $manager){
        $i = 93;
        foreach ($array as $data) {
            $object = $this->entityManager->getRepository(Course::class)
                ->find($i);
            $i++;

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
