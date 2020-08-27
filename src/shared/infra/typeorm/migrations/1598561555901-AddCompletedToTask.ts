import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCompletedToTask1598561555901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'completed',
        type: 'boolean',
        default: "'false'",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tasks', 'completed')
  }
}
