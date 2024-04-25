import { MikroORM } from '@mikro-orm/postgresql';
import { User } from '../models/User.model';
import { Note } from '../models/Note.model';

async function databaseConnection() {
    try {
        const orm = await MikroORM.init({
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            entities: [User, Note],
            port: parseInt(process.env.DB_PORT),
            debug: true,
        });
        const migrator = orm.getMigrator();
        await migrator.up();

        console.log("Connexion à la base de données réussie !");
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error);
    }
}

export default databaseConnection;