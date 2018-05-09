<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.9
 * Time: 12.32
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourseUserRepository")
 */
class EntryTask implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="entryTasks")
     */
    private $course;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creationDate;

    /**
     * @ORM\Column(type="datetime")
     */
    private $deadlineDate;


    public function getId()
    {
        return $this->id;
    }

    public function setId($id): self
    {
        $this->id = $id;

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

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreationDate()
    {
        return $this->creationDate;
    }

    public function setCreationDate(): self
    {
        $this->creationDate = new \DateTime('now');

        return $this;
    }

    public function getDeadlineDate()
    {
        return $this->deadlineDate;
    }

    public function setDeadlineDate(\DateTimeInterface $deadlineDate): self
    {
        $this->deadlineDate = $deadlineDate;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'course' => $this->course,
            'description' => $this->description,
            'creation_date' => $this->creationDate,
            'deadline_date' => $this->deadlineDate
        ];
    }
}