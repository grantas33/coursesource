<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.3.30
 * Time: 13.59
 */

namespace App\Controller;
use App\Entity\Lecture;
use App\Form\LectureType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;


class LectureController extends Controller
{

    /**
     * @Route("api/lectures", name="api_lecture_create", methods="POST")
     */
    public function setLecture(Request $request)
    {
        $lecture = new Lecture();
        $form = $this->createForm(LectureType::class, $lecture);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);

        if($form->isSubmitted() && $form->isValid()){
            $lecture->setCreationDate();
        }
        else{
            $errors = array();

            foreach ($form as $child) {
                if (!$child->isValid()) {
                    foreach($child->getErrors() as $error)
                        $errors[$child->getName()] = $error->getMessage();
                }
            }
            return new JsonResponse([
                'error_message' => $errors
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($lecture);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully created new lecture'
        ], Response::HTTP_CREATED);

    }

    /**
     * @Route("api/lectures/{id}", name="api_lecture_get", methods="GET")
     */
    public function getLecture(int $id)
    {
        $lecture = $this->getDoctrine()
            ->getRepository(Lecture::class)
            ->find($id);

        if (!$lecture) {
            return new JsonResponse([
                'error_message' => 'No lecture found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse([
            'title' => $lecture->getTitle(),
            'description' => $lecture->getDescription(),
            'teacher' => $lecture->getTeacher(),
            'course' => $lecture->getCourse(),
            'creationDate' => $lecture->getCreationDate()->format("Y-m-d H:m:s"),
            'startDate' => $lecture->getStartDate()->format("Y-m-d H:m:s"),
            'endDate' => $lecture->getEndDate() ? $lecture->getEndDate()->format("Y-m-d H:m:s") : null
        ]);
    }

    /**
     * @Route("api/lectures/{id}", name="api_lecture_update", methods="PUT")
     */
    public function editLecture(int $id, Request $request){

        $em = $this->getDoctrine()->getManager();
        $lecture = $em->getRepository(Lecture::class)
            ->find($id);

        if (!$lecture) {
            return new JsonResponse([
                'error_message' => 'No lecture found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }
        $form = $this->createForm(LectureType::class, $lecture);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);

        if(!($form->isSubmitted() && $form->isValid())){
            $errors = array();

            foreach ($form as $child) {
                if (!$child->isValid()) {
                    foreach($child->getErrors() as $error)
                        $errors[$child->getName()] = $error->getMessage();
                }
            }

            return new JsonResponse([
                'error_message' => $errors
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $em->persist($lecture);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully updated lecture '. $id
        ]);
    }

    /**
     * @Route("api/lectures", name="api_lecture_findByCourse", methods="GET")
     */
    public function findByCourse(Request $request){
        $courseId = $request->query->get('course');
        $repository = $this->getDoctrine()->getRepository(Lecture::class);
        $lectures = $repository->findByCourse($courseId);

        return new JsonResponse(
            $lectures
        );
    }
}