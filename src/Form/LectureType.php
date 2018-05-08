<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.5
 * Time: 19.13
 */

namespace App\Form;
use App\Entity\Lecture;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LectureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
            ->add('teacher')
            ->add('course')
            ->add('start_date', DateTimeType::class, array(
                'widget' => 'single_text'))
            ->add('end_date', DateTimeType::class, array(
                'widget' => 'single_text'))
            ->add('preparation_tasks')
            ->add('location')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Lecture::class,
            'csrf_protection' => false
        ));
    }
}