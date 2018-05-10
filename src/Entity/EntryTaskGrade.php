<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.10
 * Time: 15.05
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class EntryTaskGrade implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="entryTaskGrades")
     */
    private $student;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Course", inversedBy="entryTaskGrades")
     */
    private $course;

    /**
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *      min = 1,
     *      max = 10,
     *      minMessage = "Grade score must be an integer from 1 to 10",
     *      maxMessage = "Grade score must be an integer from 1 to 10"
     * )
     * @Assert\Type(
     *     type="integer",
     *     message="Grade score must be an integer from 1 to 10"
     * )
     */
    private $score;

    /**
     * @ORM\Column(type="datetime")
     */
    private $gradingDate;


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

    public function getScore()
    {
        return $this->score;
    }

    public function setScore($score): void
    {
        $this->score = $score;
    }

    public function getGradingDate()
    {
        return $this->gradingDate;
    }

    public function setGradingDate(\DateTimeInterface $date): void
    {
        $this->gradingDate = $date;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'student' => $this->student,
            'course' => $this->course,
            'score' => $this->score,
            'grading_date' => $this->gradingDate->format("Y-m-d H:i:s")
        ];
    }
}