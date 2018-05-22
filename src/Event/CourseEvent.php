<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.18
 * Time: 22.25
 */

namespace App\Event;


use App\Entity\Course;
use App\Entity\User;
use Symfony\Component\EventDispatcher\Event;

class CourseEvent extends Event
{
    protected $course;

    protected $user;

    protected $role;

    public function __construct(Course $course, User $user)
    {
        $this->course = $course;
        $this->user = $user;
    }

    public function getCourse(): Course
    {
        return $this->course;
    }


    public function getUser(): User
    {
        return $this->user;
    }

    public function getRole()
    {
        return strtolower($this->role);
    }

    public function setRole($role): void
    {
        $this->role = $role;
    }


}
