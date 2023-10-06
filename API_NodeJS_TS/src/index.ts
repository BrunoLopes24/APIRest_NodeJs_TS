// Importa o servidor e faz mete-se a porta do servidor.
import { app } from './server/app';
import { Knex } from './server/db/knex';

const startServer = () => {
    app.listen(process.env.PORT||3000,()=> {
        console.log(`Servidor aberto na porta ${process.env.PORT||3000}`);
    });
};

if (process.env.IS_LOCALHOST !== 'true'){
    Knex.migrate.latest()
        .then( ()=> {
            startServer();
        })
        .catch(
            console.log
        );
}else {
    startServer();
}