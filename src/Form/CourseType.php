<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.5
 * Time: 19.13
 */

namespace App\Form;

use App\Entity\Course;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\Valid;

class CourseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
            ->add('slogan')
            ->add('is_public', CheckboxType::class)
            ->add('is_submittable', CheckboxType::class)
            ->add('avatar')
            ->add('entry_task', EntryTaskType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => Course::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false
        ));
    }
}