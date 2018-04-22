<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.4.16
 * Time: 15.57
 */

namespace App\Controller;


use App\Entity\Assignment;
use App\Form\AssignmentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class AssignmentController extends Controller
{
    /**
     * @Route("api/assignments", name="api_assignment_create", methods="POST")
     */
    public function setAssignment(Request $request)
    {
        $assignment = new Assignment();
        $form = $this->createForm(AssignmentType::class, $assignment);
        $data = json_decode($request->getContent(), true);
        $form->submit($data, false);

        if($form->isSubmitted() && $form->isValid()){
            $assignment->setCreationDate();
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
            $em->persist($assignment);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully created new assignment'
        ], Response::HTTP_CREATED);

    }

    /**
     * @Route("api/assignments/{id}", name="api_assignment_get", methods="GET")
     */
    public function getAssignment(int $id)
    {
        $assignment = $this->getDoctrine()
            ->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse([
                'error_message' => 'No assignment found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse([
            $assignment
        ]);
    }

    /**
     * @Route("api/assignments/{id}", name="api_assignment_update", methods="PUT")
     */
    public function editAssignment(int $id, Request $request){

        $em = $this->getDoctrine()->getManager();
        $assignment = $em->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse([
                'error_message' => 'No assignment found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }
        $form = $this->createForm(AssignmentType::class, $assignment);
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
            $em->persist($assignment);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully updated assignment '. $id
        ]);
    }

    /**
     * @Route("api/assignments", name="api_assignment_filter", methods="GET")
     */
    public function filterAssignments(Request $request){

        $repository = $this->getDoctrine()->getRepository(Assignment::class);
        $course = $request->query->get('course');
        $teacher = $request->query->get('teacher');
        $is_future = $request->query->get('is_future');

        $assignments = $repository->filter($course, $teacher, $is_future) ;

        return new JsonResponse(
            $assignments
        );
    }

    /**
     * @Route("api/assignments/{id}", name="api_assignment_delete", methods="DELETE")
     */
    public function deleteAssignment(int $id){

        $assignment = $this->getDoctrine()
            ->getRepository(Assignment::class)
            ->find($id);

        if (!$assignment) {
            return new JsonResponse([
                'error_message' => 'No assignment found for id '. $id
            ], Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        try {
            $em->remove($assignment);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JSONResponse([
            'success_message' => 'Successfully deleted assignment '. $id
        ]);
    }
}