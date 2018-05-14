<?php

namespace App\Entity;

use App\Interfaces\RoleInterface;
use App\Interfaces\StatusInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CourseRepository")
 */
class Course implements JsonSerializable
{

    public function __construct()
    {
        $this->courseUsers = new ArrayCollection();
        $this->lectures = new ArrayCollection();
        $this->assignments = new ArrayCollection();
    }

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Title is required")
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
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(
     *     max = 150,
     *     maxMessage="The slogan cannot be longer than 150 characters"
     * )
     */
    private $slogan;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creation_date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_public = false;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_submittable;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $avatar;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CourseUser", mappedBy="course", cascade={"remove"})
     */
    private $courseUsers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lecture", mappedBy="course", cascade={"remove"})
     */
    private $lectures;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Assignment", mappedBy="course", cascade={"remove"})
     */
    private $assignments;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\EntryTask", mappedBy="course", cascade={"persist", "remove"})
     * @Assert\Type(type="App\Entity\EntryTask")
     * @Assert\Valid()
     */
    private $entryTask;

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

    public function setTitle($title): void
    {
        $this->title = $title;

    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription($description): void
    {
        $this->description = $description;

    }

    public function getSlogan(): ?string
    {
        return $this->slogan;
    }

    public function setSlogan($slogan): self
    {
        $this->slogan = $slogan;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creation_date;
    }

    public function setCreationDate(): void
    {
        $this->creation_date = new \DateTime('now');
    }

    public function setCreationDateManually(string $date): void
    {
        $this->creation_date = \DateTime::createFromFormat("Y-m-d", $date);

    }

    public function setCreationDateByDatetime(\DateTimeInterface $date): void
    {
        $this->creation_date = $date;

    }

    public function getIsPublic(): ?bool
    {
        return $this->is_public;
    }

    public function setIsPublic($is_public): self
    {
        $this->is_public = $is_public;

        return $this;
    }

    public function getLectureCount(){

        return $this->lectures->count();
    }

    public function getAssignmentCount(){

        return $this->assignments->count();
    }

    public function getIsSubmittable(): ?bool
    {
        return $this->is_submittable;
    }

    public function setIsSubmittable($is_submittable): self
    {
        $this->is_submittable = $is_submittable;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar($avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getEntryTask()
    {
        return $this->entryTask;
    }

    public function setEntryTask($entryTask)
    {
        $this->entryTask = $entryTask;

        return $this;
    }

    public function getTeachers(){

        $teachers = [];
        foreach($this->courseUsers as $user){
            if($user->getRole() == RoleInterface::TEACHER){
                $teachers[] = [
                    'name' => $user->getUser()->getName(),
                    'surname' => $user->getUser()->getSurname(),
                    'tag' => $user->getTag()
                ];
            }
        }

        return $teachers;
    }

    public function isAdmin(User $currentUser){

        foreach($this->courseUsers as $user){
            if($user->getUser() == $currentUser &&
                $user->getRole() == RoleInterface::ADMIN &&
                $user->getStatus() == StatusInterface::ACTIVE){
                return true;
            }
        }

        return false;
    }

    public function isTeacher(User $currentUser){

        foreach($this->courseUsers as $user){
            if($user->getUser() == $currentUser &&
                ($user->getRole() == RoleInterface::TEACHER ||  $user->getRole() == RoleInterface::ADMIN) &&
                $user->getStatus() == StatusInterface::ACTIVE){
                return true;
            }
        }

        return false;
    }

    public function jsonSerialize()
    {
        $teachers = $this->getTeachers();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slogan' => $this->slogan,
            'creation_date' => $this->creation_date->format("Y-m-d"),
            'is_public' => $this->is_public,
            'lectureCount' => $this->getLectureCount(),
            'assignmentCount' => $this->getAssignmentCount(),
            'teacherCount' => count($teachers),
            'teachers' => $teachers,
            'is_submittable' => $this->is_submittable,
            'avatar' => $this->avatar
        ];
    }
}
