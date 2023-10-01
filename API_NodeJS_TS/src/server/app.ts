// código base para rodar servidor
import express from 'express';
import 'dotenv/config';
import router from './routes';

//Instancia do servidor
const app = express();

app.use(express.json());
app.use(router);

//Exporta a instância do servidor
export { app };