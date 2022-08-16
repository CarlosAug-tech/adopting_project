import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAnimals1660137309891 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'animals',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'sex',
                        type: 'varchar',
                    },
                    {
                        name: 'isPuppy',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'isAdopt',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('animals');
    }
}
