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
use Symfony\Component\Validator\Validator\ValidatorInterface;


class CourseController extends Controller
{

    /**
     * @Route("api/course", name="api_course_create", methods="POST")
     */
    public function setCourse(Request $request, ValidatorInterface $validator)
    {
        $course = new Course();
        $form = $this->createForm(CourseType::class, $course);
        $form->submit($request->request->get($form->getName()));
        //$form->submit($request);
        //$course->setTitle($request->request->get('title'));
       // $course->setDescription($request->request->get('description'));
       // $course->setCreationDate(new \DateTime('now'));

       // $titleError = $validator->validateProperty($course, 'title');
       // $descriptionError = $validator->validateProperty($course, 'description');
       // $creationDateError = $validator->validateProperty($course, 'creation_date');
//        $formErrors = [];
//        if (count($titleError) > 0) {
//            $formErrors['titleError'] = $titleError[0]->getMessage();
//        }
//        if (count($descriptionError) > 0) {
//            $formErrors['descriptionError'] = $descriptionError[0]->getMessage();
//        }
//        if (count($creationDateError) > 0) {
//            $formErrors['creationDateError'] = $creationDateError[0]->getMessage();
//        }
//        if ($formErrors) {
//            return new JsonResponse($formErrors, Response::HTTP_BAD_REQUEST);
//        }
        if($form->isSubmitted() && $form->isValid()){
            $course = $form->getData();
            $course->setCreationDate();
        }
        else{
             $formErrors = $form->getErrors(true, false);
             return new JsonResponse($form->getData(), Response::HTTP_BAD_REQUEST);
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