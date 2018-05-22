<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.18
 * Time: 11.53
 */

namespace App\Event;


use App\Entity\Lecture;
use Symfony\Component\EventDispatcher\Event;

class LectureEvent extends Event
{

    protected $lecture;

    public function __construct(Lecture $lecture)
    {
        $this->lecture = $lecture;
    }

    public function getLecture()
    {
        return $this->lecture;
    }

}
