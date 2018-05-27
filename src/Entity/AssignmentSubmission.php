<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.5.23
 * Time: 13.45
 */

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 */
class AssignmentSubmission implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $student;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Assignment")
     */
    private $assignment;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(
     *     max = 5000,
     *     maxMessage="The comment cannot be longer than 5000 characters"
     * )
     */
    private $submission;

    /**
     * @ORM\Column(type="integer", nullable=true)
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
    private $submissionDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $gradingDate;

    public function getId()
    {
        return $this->id;
    }

    public function setId(int $id): void
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

    public function getAssignment()
    {
        return $this->assignment;
    }

    public function setAssignment(Assignment $assignment): void
    {
        $this->assignment = $assignment;
    }

    public function getSubmission()
    {
        return $this->submission;
    }

    public function setSubmission(string $submission): void
    {
        $this->submission = $submission;
    }

    public function getScore()
    {
        return $this->score;
    }

    public function setScore($score): void
    {
        $this->score = $score;
    }

    public function getSubmissionDate()
    {
        return $this->submission;
    }

    public function setSubmissionDate(\DateTimeInterface $submissionDate): void
    {
        $this->submissionDate = $submissionDate;
    }

    public function getGradingDate()
    {
        return $this->gradingDate;
    }

    public function setGradingDate(\DateTimeInterface $gradingDate): void
    {
        $this->gradingDate = $gradingDate;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'student' => $this->student,
            'assignment' => $this->assignment,
            'submission' => $this->submission,
            'score' => $this->score,
            'submission_date' => $this->submissionDate->format("Y-m-d H:i:s"),
            'grading_date' => $this->gradingDate ? $this->gradingDate->format("Y-m-d H:i:s") : null
        ];
    }
}
