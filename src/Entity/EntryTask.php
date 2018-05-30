<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.9
 * Time: 12.32
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EntryTaskRepository")
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
     * @ORM\OneToOne(targetEntity="App\Entity\Course", inversedBy="entryTask")
     */
    private $course;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank(message="Entry task description cannot be blank")
     * @Assert\Length(
     *     max = 2000,
     *     maxMessage="The entry task description cannot be longer than 2000 characters"
     * )
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="You must enter a valid date")
     * @Assert\DateTime(message="You must enter a valid date")
     * @Assert\Expression(
     *     "value > this.getCurrentDate()",
     *     message="The date must be in the future!")
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

    public function getDeadlineDate()
    {
        return $this->deadlineDate;
    }

    public function setDeadlineDate($deadline_date): self
    {
        $this->deadlineDate = $deadline_date;

        return $this;
    }


    public function getCurrentDate() : ?\DateTimeInterface
    {
        return new \DateTime('now');
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'course' => $this->course,
            'description' => $this->description,
            'deadline_date' => $this->deadlineDate->format("Y-m-d H:i:s")
        ];
    }
}
