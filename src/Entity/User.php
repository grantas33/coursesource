<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\AttributeOverride;
use Doctrine\ORM\Mapping\AttributeOverrides;
use Doctrine\ORM\Mapping\Column;
use JsonSerializable;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(
 *     fields = {"email"},
 *     message = "This email is already in use"
 * )
 */
class User extends BaseUser implements JsonSerializable
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
        $this->courseUsers = new ArrayCollection();
        $this->lectures = new ArrayCollection();
        $this->assignments = new ArrayCollection();
        $this->notifications = new ArrayCollection();
    }

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Name is required")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="Name should be at least 2 characters long",
     *     max = 25,
     *     maxMessage="Name cannot be longer than 25 characters",
     * )
     */
    protected $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Surname is required")
     * @Assert\Length(
     *     min = 2,
     *     minMessage="Surname should be at least 2 characters long",
     *     max = 25,
     *     maxMessage="Surname cannot be longer than 25 characters",
     * )
     */
    protected $surname;

    /**
     * @Assert\NotBlank(message="Email is required")
     * @Assert\Email(message="This is not a valid email address")
     */
    protected $email;

    /**
     * @Assert\NotBlank(message="Password is required")
     * @Assert\Length(
     *     min=3,
     *     max=4096,
     *     minMessage="Password must be at least 3 characters long"
     * )
     */
    protected $plainPassword;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $avatar;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CourseUser", mappedBy="user", cascade={"remove"})
     */
    protected $courseUsers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Lecture", mappedBy="teacher", cascade={"remove"})
     */
    protected $lectures;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Assignment", mappedBy="teacher", cascade={"remove"})
     */
    protected $assignments;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname($surname): self
    {
        $this->surname = $surname;

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

    public function getCourseUsers()
    {

        return $this->courseUsers;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            'avatar' => $this->avatar,
        ];
    }
}
