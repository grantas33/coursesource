<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.10
 * Time: 10.49
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EntryTaskSubmissionRepository")
 */
class EntryTaskSubmission implements JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="entryTaskSubmissions")
     */
    private $student;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="entryTaskSubmissions")
     */
    private $course;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(
     *     max = 2000,
     *     maxMessage="The submission cannot be longer than 2000 characters"
     * )
     */
    private $submission;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;


    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getStudent()
    {
        return $this->student;
    }

    public function setStudent(User $student): void
    {
        $this->student = $student;
    }

    public function getCourse()
    {
        return $this->course;
    }

    public function setCourse(Course $course): void
    {
        $this->course = $course;
    }

    public function getSubmission()
    {
        return $this->submission;
    }

    public function setSubmission(string $submission): void
    {
        $this->submission = $submission;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): void
    {
        $this->date = $date;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'student' => $this->student,
            'course' => $this->course,
            'submission' => $this->submission,
            'date' => $this->date->format("Y-m-d H:i:s")
        ];
    }
}