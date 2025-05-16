import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm';

export class CreateSeatStatus1712345678901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng seat_status
    await queryRunner.createTable(
      new Table({
        name: 'seat_status',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'seatId',
            type: 'int',
          },
          {
            name: 'eventDetailId',
            type: 'int',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'available'",
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'holdUntil',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Thêm foreign key cho seatId
    await queryRunner.createForeignKey(
      'seat_status',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat',
        onDelete: 'CASCADE',
      }),
    );

    // Thêm foreign key cho eventDetailId
    await queryRunner.createForeignKey(
      'seat_status',
      new TableForeignKey({
        columnNames: ['eventDetailId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'event_detail',
        onDelete: 'CASCADE',
      }),
    );

    // Thêm foreign key cho userId
    await queryRunner.createForeignKey(
      'seat_status',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );

    // Xóa các cột không cần thiết từ bảng seat
    await queryRunner.dropColumn('seat', 'status');
    await queryRunner.dropColumn('seat', 'userId');
    await queryRunner.dropColumn('seat', 'holdUntil');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Thêm lại các cột đã xóa vào bảng seat
    await queryRunner.addColumns('seat', [
      new TableColumn({
        name: 'status',
        type: 'varchar',
        default: "'available'",
      }),
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'holdUntil',
        type: 'datetime',
        isNullable: true,
      }),
    ]);

    // Xóa bảng seat_status
    await queryRunner.dropTable('seat_status');
  }
} 