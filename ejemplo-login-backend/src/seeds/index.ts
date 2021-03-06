import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const Seeds = readFileSync('src/database/Seeds.sql').toString();


/**
 * se ejecutan los insert que estan el el archivo src/database/inserts.sql
 */
async function execute() {
    try {
        await pool.query(Seeds);
    } catch (error) {
        console.log(error);
    }
}

execute();