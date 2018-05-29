<?php declare(strict_types = 1);
// phpcs:ignoreFile
namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180509115042 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE entry_task (id INT AUTO_INCREMENT NOT NULL, course_id INT DEFAULT NULL, description VARCHAR(255) NOT NULL, creation_date DATETIME NOT NULL, deadline_date DATETIME NOT NULL, UNIQUE INDEX UNIQ_F65CA336591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE entry_task ADD CONSTRAINT FK_F65CA336591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE course ADD is_submittable TINYINT(1) NOT NULL, ADD avatar VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE entry_task');
        $this->addSql('ALTER TABLE course DROP is_submittable, DROP avatar');
    }
}
