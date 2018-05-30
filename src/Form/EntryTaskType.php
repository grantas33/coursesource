<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.9
 * Time: 13.30
 */

namespace App\Form;

use App\Entity\EntryTask;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class EntryTaskType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('description')
            ->add('deadlineDate', DateTimeType::class, [
                'widget' => 'single_text']);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => EntryTask::class,
            'csrf_protection' => false
        ));
    }
}
