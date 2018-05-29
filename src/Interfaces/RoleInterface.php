<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.3
 * Time: 17.15
 */

namespace App\Interfaces;

interface RoleInterface
{
    public const ADMIN = 'ADMIN';
    public const TEACHER = 'TEACHER';
    public const STUDENT = 'STUDENT';
    public const APPLICANT = 'APPLICANT';
}
