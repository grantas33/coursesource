<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.3
 * Time: 17.20
 */

namespace App\Interfaces;


interface StatusInterface
{
    public const ACTIVE = 'ACTIVE';
    public const PENDING = 'PENDING';
    public const INVITED = 'INVITED';
    public const FINISHED = 'FINISHED';
}