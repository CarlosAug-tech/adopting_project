import createConnection from '@infra/database/typeorm';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

async function create() {
    const connection = await createConnection();

    const hashPassword = await hash('1234', 12);

    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin" created_at)
    values('${v4()}', 'admin', 'admin@adopting.com', '${hashPassword}', true, 'now()')
    `);

    await connection.close();
}

create().then(() => console.log('User admin created with success!'));
