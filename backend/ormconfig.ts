import 'dotenv/config';

export = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'db_adopting',
    migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
    cli: {
        migrationsDir: './src/infra/database/typeorm/migrations/',
    },
    entities: ['./src/infra/database/typeorm/entities/*.ts'],
};
