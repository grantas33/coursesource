<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.1
 * Time: 14.37
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourseUserRepository")
 */
class CourseUser
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $user;

    /**
     * @ORM\Column(type="integer")
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
    private $course_status;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_notifiable = true;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getUser(): ?int
    {
        return $this->user;
    }

    public function setUser(int $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCourse(): ?int
    {
        return $this->course;
    }

    public function setCourse(int $course): self
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

    public function getCourseStatus(): ?string
    {
        return $this->course_status;
    }

    public function setCourseStatus(string $course_status): self
    {
        $this->course_status = $course_status;

        return $this;
    }

    public function getIsNotifiable(): ?bool
    {
        return $this->is_notifiable;
    }

    public function setIsNotifiable($is_notifiable): self
    {
        $this->is_notifiable = $is_notifiable;

        return $this;
    }

}