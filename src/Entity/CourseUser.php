<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.1
 * Time: 14.37
 */

namespace App\Entity;

use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourseUserRepository")
 */
class CourseUser implements \JsonSerializable
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="courseUsers")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="courseUsers")
     */
    private $course;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $role;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tag;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isNotifiable = true;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCourse()
    {
        return $this->course;
    }

    public function setCourse(Course $course): self
    {
        $this->course = $course;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getIsNotifiable(): ?bool
    {
        return $this->isNotifiable;
    }

    public function setIsNotifiable($isNotifiable): self
    {
        $this->isNotifiable = $isNotifiable;

        return $this;
    }

    public function isActiveStudent(): ?bool
    {
        return $this->role == RoleInterface::STUDENT &&
               $this->status == StatusInterface::ACTIVE;
    }

    public function isActiveAdmin(): ?bool
    {
        return $this->role == RoleInterface::ADMIN &&
            $this->status == StatusInterface::ACTIVE;
    }

    public function jsonSerialize()
    {
        return [
        'id' => $this->id,
        'user' => $this->user,
        'course' => $this->course,
        'role' => $this->role,
        'tag' => $this->tag,
        'status' => $this->status,
        'isNotifiable' => $this->isNotifiable
    ];
    }
}
