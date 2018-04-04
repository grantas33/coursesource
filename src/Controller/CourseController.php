<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.3.30
 * Time: 13.59
 */

namespace App\Controller;
use App\Entity\Course;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class CourseController extends Controller
{

    /**
     * @Route("api/course", name="api_course")
     */
    public function setCourse(Request $request, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $course = new Course();
        $course->setTitle($request->request->get('title'));
        $course->setDescription($request->request->get('description'));
        $course->setCreationDate($request->request->get('creationDate'));

        $titleError = $validator->validateProperty($course, 'title');
        $descriptionError = $validator->validateProperty($course, 'description');
        $creationDateError = $validator->validateProperty($course, 'creation_date');
        $formErrors = [];
        if(count($titleError) > 0) {
            $formErrors['titleError'] = $titleError[0]->getMessage();
        }
        if(count($descriptionError) > 0) {
            $formErrors['descriptionError'] = $descriptionError[0]->getMessage();
        }
        if(count($creationDateError) > 0) {
            $formErrors['creationDateError'] = $creationDateError[0]->getMessage();
        }
        if($formErrors) {
            return new JsonResponse($formErrors);
        }

        $em->persist($course);
        $em->flush();
        return new JsonResponse([
            'success_message' => 'Successfully created new course'
        ]);

    }

}