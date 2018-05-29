<?php
/**
 * Created by PhpStorm.
 * User: matt
 * Date: 18.5.29
 * Time: 18.02
 */

namespace App\Services;


use App\Interfaces\CourseSortInterface;

class CourseService
{
    public function sortCourses($sort, $courses){

        if(in_array($sort, CourseSortInterface::PARAMETERS)){
            $method = 'get' . ucfirst($sort);
            usort($courses, function($a, $b) use($method)
            {
                return $a->$method() < $b->$method();
            });
        }

        return $courses;
    }

}