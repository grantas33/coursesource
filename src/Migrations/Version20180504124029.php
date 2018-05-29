<?php declare(strict_types = 1);
// phpcs:ignoreFile
namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180504124029 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE course_user ADD user_id INT DEFAULT NULL, ADD course_id INT DEFAULT NULL, DROP user, DROP course');
        $this->addSql('ALTER TABLE course_user ADD CONSTRAINT FK_45310B4FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE course_user ADD CONSTRAINT FK_45310B4F591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('CREATE INDEX IDX_45310B4FA76ED395 ON course_user (user_id)');
        $this->addSql('CREATE INDEX IDX_45310B4F591CC992 ON course_user (course_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE course_user DROP FOREIGN KEY FK_45310B4FA76ED395');
        $this->addSql('ALTER TABLE course_user DROP FOREIGN KEY FK_45310B4F591CC992');
        $this->addSql('DROP INDEX IDX_45310B4FA76ED395 ON course_user');
        $this->addSql('DROP INDEX IDX_45310B4F591CC992 ON course_user');
        $this->addSql('ALTER TABLE course_user ADD user INT NOT NULL, ADD course INT NOT NULL, DROP user_id, DROP course_id');
    }
}
