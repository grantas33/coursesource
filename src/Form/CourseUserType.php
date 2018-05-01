<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.1
 * Time: 15.09
 */

namespace App\Form;
use App\Entity\CourseUser;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CourseUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('course')
            ->add('role')
            ->add('course_status')
            ->add('tag');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => CourseUser::class,
            'csrf_protection' => false,
        ));
    }

}