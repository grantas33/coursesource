<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AssignmentRepository")
 */
class Assignment implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(
     *     min = 3,
     *     minMessage="The title should be at least 3 characters long",
     *     max = 25,
     *     maxMessage="The title cannot be longer than 25 characters"
     * )
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(
     *     max = 2000,
     *     maxMessage="The description cannot be longer than 2000 characters"
     * )
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="assignments")
     */
    private $teacher;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="assignments")
     */
    private $course;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creation_date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $deadline_date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_gradeable;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_submittable;

    public function getId()
    {
        return $this->id;
    }

    public function setId(int $id){

        $this->id = $id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getTeacher()
    {
        return $this->teacher;
    }

    public function setTeacher($teacher): self
    {
        $this->teacher = $teacher;

        return $this;
    }

    public function getCourse()
    {
        return $this->course;
    }

    public function setCourse($course): self
    {
        $this->course = $course;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creation_date;
    }

    public function setCreationDate(): self
    {
        $this->creation_date = new \DateTime('now');

        return $this;
    }

    public function setCreationDateManually(string $date): void
    {
        $this->creation_date = \DateTime::createFromFormat("Y-m-d H:i:s", $date);

    }

    public function getDeadlineDate(): ?\DateTimeInterface
    {
        return $this->deadline_date;
    }

    public function setDeadlineDate(\DateTimeInterface $deadline_date): self
    {
        $this->deadline_date = $deadline_date;

        return $this;
    }

    public function getIsGradeable(): ?bool
    {
        return $this->is_gradeable;
    }

    public function setIsGradeable(bool $is_gradeable): self
    {
        $this->is_gradeable = $is_gradeable;

        return $this;
    }

    public function getIsSubmittable(): ?bool
    {
        return $this->is_submittable;
    }

    public function setIsSubmittable(bool $is_submittable): self
    {
        $this->is_submittable = $is_submittable;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'teacher' => $this->teacher,
            'course' => $this->course,
            'creation_date' => $this->creation_date->format("Y-m-d H:i:s"),
            'deadline_date' => $this->deadline_date->format("Y-m-d H:i:s"),
            'is_gradeable' => $this->is_gradeable,
            'is_submittable' => $this->is_submittable
        ];
    }
}
