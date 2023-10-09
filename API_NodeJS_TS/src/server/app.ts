// código base para rodar servidor
import express from 'express';
import 'dotenv/config';
import router from './routes';
import cors from 'cors';

//Instancia do servidor
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.ENABLE_CORS?.split(';') || []
}));


app.use(router);

//Exporta a instância do servidor
export { app };