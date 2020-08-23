import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddCreatedAtUpdatedAtFieldToUsers1598185404731
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('projects', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('projects', 'created_at')
    await queryRunner.dropColumn('projects', 'updated_at')
  }
}
