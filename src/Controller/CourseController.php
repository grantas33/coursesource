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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class CourseController extends Controller
{

    /**
     * @Route("api/course", name="api_course", methods="POST")
     */
    public function setCourse(Request $request, ValidatorInterface $validator)
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

        $em = $this->getDoctrine()->getManager();
        $em->persist($course);
        $em->flush();
        return new JsonResponse([
            'success_message' => 'Successfully created new course'
        ]);

    }

    /**
     * @Route("api/course/{id}", name="api_course_get", methods="GET")
     */
    public function getCourse(int $id){
        $course = $this->getDoctrine()
            ->getRepository(Course::class)
            ->find($id);

        if (!$course) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        return new JSONResponse([
            'title' => $course->getTitle(),
            'description' => $course->getDescription(),
            'creationDate' => $course->getCreationDate()->format('Y-m-d')
        ]);
    }

}