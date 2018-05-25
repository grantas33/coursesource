<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.22
 * Time: 21.35
 */

namespace App\Interfaces;


interface CourseSortInterface
{
    public const PARAMETERS = ['creationDate', 'assignmentCount', 'lectureCount', 'teacherCount'];
}
