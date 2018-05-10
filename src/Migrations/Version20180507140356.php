<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180507140356 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lecture ADD teacher_id INT DEFAULT NULL, ADD course_id INT DEFAULT NULL, DROP teacher, DROP course');
        $this->addSql('ALTER TABLE lecture ADD CONSTRAINT FK_C167794841807E1D FOREIGN KEY (teacher_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE lecture ADD CONSTRAINT FK_C1677948591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('CREATE INDEX IDX_C167794841807E1D ON lecture (teacher_id)');
        $this->addSql('CREATE INDEX IDX_C1677948591CC992 ON lecture (course_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lecture DROP FOREIGN KEY FK_C167794841807E1D');
        $this->addSql('ALTER TABLE lecture DROP FOREIGN KEY FK_C1677948591CC992');
        $this->addSql('DROP INDEX IDX_C167794841807E1D ON lecture');
        $this->addSql('DROP INDEX IDX_C1677948591CC992 ON lecture');
        $this->addSql('ALTER TABLE lecture ADD teacher INT NOT NULL, ADD course INT NOT NULL, DROP teacher_id, DROP course_id');
    }
}
