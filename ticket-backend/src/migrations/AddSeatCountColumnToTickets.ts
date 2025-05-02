import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSeatCountColumnToTickets implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tickets
      ADD COLUMN seat_count INTEGER NOT NULL DEFAULT 0;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tickets
      DROP COLUMN seat_count;
    `);
  }
}
