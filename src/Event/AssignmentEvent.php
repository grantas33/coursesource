<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.18
 * Time: 22.11
 */

namespace App\Event;


use App\Entity\Assignment;
use Symfony\Component\EventDispatcher\Event;

class AssignmentEvent extends Event
{

    protected $assignment;

    public function __construct(Assignment $assignment)
    {
        $this->assignment = $assignment;
    }

    public function getAssignment()
    {
        return $this->assignment;
    }

}