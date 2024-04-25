import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import databaseConnection from './src/config/connectdatabase'

const app = express();

app.use(bodyParser.json())
dotenv.config();

databaseConnection()

const port = process.env.PORT || 3000;

app.use(express.json());


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
