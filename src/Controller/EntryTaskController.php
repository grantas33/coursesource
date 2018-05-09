<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.9
 * Time: 13.21
 */

namespace App\Controller;


use App\Entity\Course;
use App\Entity\CourseUser;
use App\Entity\EntryTask;
use App\Form\EntryTaskType;
use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EntryTaskController extends Controller
{
    /**
     * @Route("api/entrytasks/{courseId}", name="api_entryTasks_get", methods="GET")
     */
    public function getEntryTask(int $courseId){

        $publicCourse = $this->getDoctrine()
            ->getRepository(Course::class)
            ->findOneBy([
               'id'=>$courseId,
               'is_public'=>true,
            ]);

        if(!$publicCourse){
            $courseAdmin = $this->getDoctrine()
                ->getRepository(CourseUser::class)
                ->findOneBy([
                    'course'=>$courseId,
                    'user'=>$this->getUser(),
                    'role'=>RoleInterface::ADMIN,
                    'status'=>StatusInterface::ACTIVE
                ]);
            if(!$courseAdmin) {
                return new JSONResponse([
                    'error_message' => 'This course is private'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }

        $entryTask = $this->getDoctrine()
            ->getRepository(EntryTask::class)
            ->findOneBy([
                'course'=>$courseId,
            ]);

        if(!$entryTask){
            return new JSONResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        return new JSONResponse(
            $entryTask
        );
    }

    /**
     * @Route("api/entrytasks/{courseId}", name="api_entryTasks_edit", methods="PUT")
     */
    public function editEntryTask(int $courseId, Request $request){

        $em = $this->getDoctrine()->getManager();
        $entryTask = $this->getDoctrine()
            ->getRepository(EntryTask::class)
            ->findOneBy([
                'course'=>$courseId,
            ]);

        if(!$entryTask){
            return new JSONResponse([
                'error_message' => 'This course does not have an entry task'
            ], Response::HTTP_BAD_REQUEST);
        }

        $courseAdmin = $this->getDoctrine()
            ->getRepository(CourseUser::class)
            ->findOneBy([
                'course'=>$courseId,
                'user'=>$this->getUser(),
                'role'=>RoleInterface::ADMIN,
                'status'=>StatusInterface::ACTIVE
            ]);

        if(!$courseAdmin){
            return new JSONResponse([
                'error_message' => 'You cannot edit this entry task'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $form = $this->createForm(EntryTaskType::class, $entryTask);
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
            $em->persist($entryTask);
            $em->flush();
        }
        catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully updated entry task for course '. $courseId
        ]);
    }
}