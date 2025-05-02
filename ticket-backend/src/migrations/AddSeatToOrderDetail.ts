import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSeatToOrderDetail implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE order_detail
      ADD COLUMN seat TEXT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE order_detail
      DROP COLUMN seat;
    `);
  }
}
