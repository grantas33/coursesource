<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.19
 * Time: 00.14
 */

namespace App\Event;


use Symfony\Component\EventDispatcher\Event;

class GradeEvent extends Event
{
    protected $grade;

    public function __construct($grade)
    {
        $this->grade = $grade;
    }

    public function getGrade()
    {
        return $this->grade;
    }

}
