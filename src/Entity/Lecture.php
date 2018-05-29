<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LectureRepository")
 */
class Lecture implements JsonSerializable
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
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="lectures")
     */
    private $teacher;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="lectures")
     */
    private $course;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creation_date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $start_date;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\Expression(
     * "this.getStartDate() < value",
     * message="The end date must be after the start date"
     * )
     */
    private $end_date;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(
     *     max = 2000,
     *     maxMessage="Preparation task description cannot be longer than 2000 characters"
     * )
     */
    private $preparation_tasks;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Length(
     *     min = 3,
     *     minMessage="The location name should be at least 3 characters long",
     *     max = 25,
     *     maxMessage="The location name cannot be longer than 25 characters"
     * )
     */
    private $location;

    public function getId()
    {
        return $this->id;
    }

    public function setId(int $id)
    {
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

    public function setCreationDateByDatetime(\DateTimeInterface $date): void
    {
        $this->creation_date = $date;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(?\DateTimeInterface $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getPreparationTasks(): ?string
    {
        return $this->preparation_tasks;
    }

    public function setPreparationTasks($preparation_tasks): self
    {
        $this->preparation_tasks = $preparation_tasks;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation($location): self
    {
        $this->location = $location;

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
            'start_date' => $this->start_date->format("Y-m-d H:i:s"),
            'end_date' => $this->end_date ? $this->getEndDate()->format("Y-m-d H:i:s") : null,
            'preparation_tasks' => $this->preparation_tasks,
            'location' => $this->location
            ];
    }
}
