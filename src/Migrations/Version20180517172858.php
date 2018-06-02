<?php declare(strict_types = 1);
// phpcs:ignoreFile
namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180517172858 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE entry_task_grade');
        $this->addSql('ALTER TABLE course ADD slogan LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE entry_task_submission ADD score INT NOT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE entry_task_grade (id INT AUTO_INCREMENT NOT NULL, student_id INT DEFAULT NULL, course_id INT DEFAULT NULL, score INT NOT NULL, grading_date DATETIME NOT NULL, INDEX IDX_654FC26CB944F1A (student_id), INDEX IDX_654FC26591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE entry_task_grade ADD CONSTRAINT FK_654FC26591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE entry_task_grade ADD CONSTRAINT FK_654FC26CB944F1A FOREIGN KEY (student_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE course DROP slogan');
        $this->addSql('ALTER TABLE entry_task_submission DROP score');
    }
}
