import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import databaseConnection from './src/config/connectdatabase'
import UserRoute from "./src/routes/User.Routes";
import NoteRoute from "./src/routes/Note.Routes";
import cookieParser from 'cookie-parser';

const initializeServer = async () => {

    const app = express();

    app.use(cookieParser());

    app.use(bodyParser.json())
    dotenv.config();
    
    const orm = await databaseConnection()

    const port = process.env.PORT || 3000;
    
    app.use(express.json());
    
    app.use('/users', UserRoute)
    app.use('/notes', NoteRoute)
    
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
    
    return orm 
}

const orm = initializeServer()

export { orm }