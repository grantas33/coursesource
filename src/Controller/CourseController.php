<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.3.30
 * Time: 13.59
 */

namespace App\Controller;
use App\Entity\Course;
use App\Form\CourseType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;


class CourseController extends Controller
{

    /**
     * @Route("api/course", name="api_course_create", methods="POST")
     */
    public function setCourse(Request $request)
    {
        $course = new Course();
        $form = $this->createForm(CourseType::class, $course);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if($form->isSubmitted() && $form->isValid()){
            $course = $form->getData();
            $course->setCreationDate();
        }
        else{
            $errors = array();

            foreach ($form as $child) {
                if (!$child->isValid()) {
                    $error = $child->getErrors()[0];
                    $errors[$child->getName()] = $error->getMessage();
                }
            }

            return new JsonResponse([
                 'error_message' => $errors
             ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($course);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e],
                Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully created new course'
        ]);

    }

    /**
     * @Route("api/course/{id}", name="api_course_get", methods="GET")
     */
    public function getCourse(int $id)
    {
        $course = null;
        try {
            $course = $this->getDoctrine()
                ->getRepository(Course::class)
                ->find($id);
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e],
                Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if (!$course) {
            return new JsonResponse([
                'error_message' => 'No product found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse([
            'title' => $course->getTitle(),
            'description' => $course->getDescription(),
            'creationDate' => $course->getCreationDate()->format('Y-m-d')
        ]);
    }
}