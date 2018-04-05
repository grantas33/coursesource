<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.5
 * Time: 19.13
 */

namespace App\Form;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class CourseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
           // ->add('save', SubmitType::class)
        ;
    }
}