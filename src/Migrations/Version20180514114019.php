<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180514114019 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE lecture (id INT AUTO_INCREMENT NOT NULL, teacher_id INT DEFAULT NULL, course_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, creation_date DATETIME NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME DEFAULT NULL, preparation_tasks LONGTEXT DEFAULT NULL, location VARCHAR(255) DEFAULT NULL, INDEX IDX_C167794841807E1D (teacher_id), INDEX IDX_C1677948591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE course (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, slogan LONGTEXT DEFAULT NULL, creation_date DATETIME NOT NULL, is_public TINYINT(1) NOT NULL, is_submittable TINYINT(1) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE entry_task_submission (id INT AUTO_INCREMENT NOT NULL, student_id INT DEFAULT NULL, course_id INT DEFAULT NULL, submission LONGTEXT NOT NULL, score INT NOT NULL, date DATETIME NOT NULL, INDEX IDX_979C35A9CB944F1A (student_id), INDEX IDX_979C35A9591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), UNIQUE INDEX UNIQ_8D93D649C05FB297 (confirmation_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assignment (id INT AUTO_INCREMENT NOT NULL, teacher_id INT DEFAULT NULL, course_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, creation_date DATETIME NOT NULL, deadline_date DATETIME NOT NULL, is_gradeable TINYINT(1) NOT NULL, is_submittable TINYINT(1) NOT NULL, INDEX IDX_30C544BA41807E1D (teacher_id), INDEX IDX_30C544BA591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE course_user (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, course_id INT DEFAULT NULL, role VARCHAR(255) NOT NULL, tag VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, is_notifiable TINYINT(1) NOT NULL, INDEX IDX_45310B4FA76ED395 (user_id), INDEX IDX_45310B4F591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE entry_task (id INT AUTO_INCREMENT NOT NULL, course_id INT DEFAULT NULL, description LONGTEXT NOT NULL, deadline_date DATETIME NOT NULL, UNIQUE INDEX UNIQ_F65CA336591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE lecture ADD CONSTRAINT FK_C167794841807E1D FOREIGN KEY (teacher_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE lecture ADD CONSTRAINT FK_C1677948591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE entry_task_submission ADD CONSTRAINT FK_979C35A9CB944F1A FOREIGN KEY (student_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE entry_task_submission ADD CONSTRAINT FK_979C35A9591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE assignment ADD CONSTRAINT FK_30C544BA41807E1D FOREIGN KEY (teacher_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE assignment ADD CONSTRAINT FK_30C544BA591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE course_user ADD CONSTRAINT FK_45310B4FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE course_user ADD CONSTRAINT FK_45310B4F591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE entry_task ADD CONSTRAINT FK_F65CA336591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lecture DROP FOREIGN KEY FK_C1677948591CC992');
        $this->addSql('ALTER TABLE entry_task_submission DROP FOREIGN KEY FK_979C35A9591CC992');
        $this->addSql('ALTER TABLE assignment DROP FOREIGN KEY FK_30C544BA591CC992');
        $this->addSql('ALTER TABLE course_user DROP FOREIGN KEY FK_45310B4F591CC992');
        $this->addSql('ALTER TABLE entry_task DROP FOREIGN KEY FK_F65CA336591CC992');
        $this->addSql('ALTER TABLE lecture DROP FOREIGN KEY FK_C167794841807E1D');
        $this->addSql('ALTER TABLE entry_task_submission DROP FOREIGN KEY FK_979C35A9CB944F1A');
        $this->addSql('ALTER TABLE assignment DROP FOREIGN KEY FK_30C544BA41807E1D');
        $this->addSql('ALTER TABLE course_user DROP FOREIGN KEY FK_45310B4FA76ED395');
        $this->addSql('DROP TABLE lecture');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE entry_task_submission');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE assignment');
        $this->addSql('DROP TABLE course_user');
        $this->addSql('DROP TABLE entry_task');
    }
}
