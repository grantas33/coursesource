<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.19
 * Time: 00.14
 */

namespace App\Event;

use App\Entity\AssignmentSubmission;
use Symfony\Component\EventDispatcher\Event;

class GradeEvent extends Event
{
    protected $assignmentSubmission;

    public function __construct(AssignmentSubmission $assignmentSubmission)
    {
        $this->assignmentSubmission = $assignmentSubmission;
    }

    public function getAssignmentSubmission()
    {
        return $this->assignmentSubmission;
    }
}
