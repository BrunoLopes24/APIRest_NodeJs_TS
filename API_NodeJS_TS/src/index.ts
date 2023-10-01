// Importa o servidor e faz mete-se a porta do servidor.
import { app } from './server/app';

app.listen(process.env.PORT||3000,()=> {
    console.log(`Servidor aberto na porta ${process.env.PORT||3000}`);
});
