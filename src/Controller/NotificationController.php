<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.18
 * Time: 14.21
 */

namespace App\Controller;

use App\Entity\Notification;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class NotificationController extends Controller
{
    /**
     * @Route("api/notifications", name="api_notifications_getAll", methods="GET")
     */
    public function getAllNotificationsByUser()
    {

        $notifications = $this->getDoctrine()
            ->getRepository(Notification::class)
            ->findBy([
                'user' => $this->getUser()],
                ['date' => 'DESC']);

        return new JSONResponse(
            $notifications
        );
    }

    /**
     * @Route("api/notifications/last", name="api_notifications_getLast", methods="GET")
     */
    public function getLastNotificationsByUser()
    {

        $notifications = $this->getDoctrine()
            ->getRepository(Notification::class)
            ->findBy([
                'user' => $this->getUser()],
                ['date' => 'DESC'],
                5);

        return new JSONResponse(
            $notifications
        );
    }

    /**
     * @Route("api/notifications/unseen", name="api_notifications_getUnseen", methods="GET")
     */
    public function getLastUnseenNotificationsByUser()
    {
        $em = $this->getDoctrine()->getManager();

        $notifications = $this->getDoctrine()
            ->getRepository(Notification::class)
            ->findBy([
                'user' => $this->getUser(),
                'isSeen' => false],
                ['date' => 'DESC'],
                5);

        foreach ($notifications as $notification) {
            if (!$notification->getIsAcceptable()) {
                $notification->setIsSeen(true);
                $em->persist($notification);
            }
        }

        try {
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JSONResponse(
            $notifications
        );
    }

    /**
     * @Route("api/notifications/read/{id}", name="api_notifications_read", methods="PUT")
     */
    public function readNotification(int $id)
    {
        $em = $this->getDoctrine()->getManager();

        $notification = $this->getDoctrine()
            ->getRepository(Notification::class)
            ->findOneBy([
                'user' => $this->getUser(),
                'id' => $id
            ]);

        if(!$notification){
            return new JsonResponse([
                'error_message' => 'Cannot find notification',
            ], Response::HTTP_BAD_REQUEST);
        }

        $notification->setIsSeen(true);

        try {
            $em->persist($notification);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JSONResponse([
            'success_message' => 'Successfully read the notification'
        ]);
    }

}
