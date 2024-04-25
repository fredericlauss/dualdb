import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { User } from '../src/models/User.model';
import { Note } from '../src/models/Note.model';
import { config } from 'dotenv';

config({
    path: __dirname + '/../.env'
});

export default defineConfig(
    {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [Note, User],
        port: parseInt(process.env.DB_PORT),
        extensions: [Migrator],
        migrations: {
            path: __dirname + '/migrations'
        },
    }
)