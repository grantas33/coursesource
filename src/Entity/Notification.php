<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.17
 * Time: 20.02
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class Notification implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="notifications")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="notifications")
     */
    private $course;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(
     *     max = 2000,
     *     maxMessage="The message cannot be longer than 2000 characters"
     * )
     */
    private $message;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $link;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isSeen = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isAcceptable;


    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getCourse()
    {
        return $this->course;
    }

    public function setCourse(Course $course): void
    {
        $this->course = $course;
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

    public function getLink()
    {
        return $this->link;
    }

    public function setLink(string $link): void
    {
        $this->link = $link;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date): void
    {
        $this->date = $date;
    }

    public function getIsSeen()
    {
        return $this->isSeen;
    }

    public function setIsSeen($isSeen): void
    {
        $this->isSeen = $isSeen;
    }

    public function getIsAcceptable()
    {
        return $this->isAcceptable;
    }


    public function setIsAcceptable($isAcceptable): void
    {
        $this->isAcceptable = $isAcceptable;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'course' => $this->course,
            'message' => $this->message,
            'link' => $this->link,
            'date' => $this->date,
            'is_seen' => $this->isSeen,
            'is_acceptable' => $this->isAcceptable
        ];
    }
}