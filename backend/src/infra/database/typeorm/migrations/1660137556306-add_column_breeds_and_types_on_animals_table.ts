import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class addColumnBreedsAndTypesOnAnimalsTable1660137556306
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('animals', [
            new TableColumn({
                name: 'breed_id',
                type: 'uuid',
            }),
            new TableColumn({
                name: 'type_id',
                type: 'uuid',
            }),
        ]);

        await queryRunner.createForeignKey(
            'animals',
            new TableForeignKey({
                columnNames: ['breed_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'breeds',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'animals',
            new TableForeignKey({
                columnNames: ['type_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'types',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('animals', ['breed_id', 'type_id']);
    }
}
