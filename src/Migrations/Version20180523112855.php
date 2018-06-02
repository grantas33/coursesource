<?php declare(strict_types = 1);
// phpcs:ignoreFile
namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180523112855 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE assignment_submission (id INT AUTO_INCREMENT NOT NULL, student_id INT DEFAULT NULL, assignment_id INT DEFAULT NULL, submission LONGTEXT NOT NULL, score INT DEFAULT NULL, creation_date DATETIME NOT NULL, grading_date DATETIME NOT NULL, INDEX IDX_E5A63E2CCB944F1A (student_id), INDEX IDX_E5A63E2CD19302F8 (assignment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assignment_submission ADD CONSTRAINT FK_E5A63E2CCB944F1A FOREIGN KEY (student_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE assignment_submission ADD CONSTRAINT FK_E5A63E2CD19302F8 FOREIGN KEY (assignment_id) REFERENCES assignment (id)');
        $this->addSql('ALTER TABLE entry_task_submission CHANGE score score INT DEFAULT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE assignment_submission');
        $this->addSql('ALTER TABLE entry_task_submission CHANGE score score INT NOT NULL');
    }
}
