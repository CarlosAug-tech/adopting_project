import 'dotenv/config';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === 'test'
                    ? 'db_adopting_test'
                    : 'db_adopting',
        }),
    );
};
