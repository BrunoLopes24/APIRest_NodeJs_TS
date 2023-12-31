import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config  = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..',  '..', '..', '..', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname,'..', 'seeds') // Função que automatiza inserção de muitos dados numa tabela de uma vez só.
    },
    pool:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON'); //Activa chaves estrangeiras
            done();
        }
    }
};


export const test: Knex.Config  = {
    ...development,
    connection: ':memory:', // Faz com que cada vez que saia e volte no teste, a bd limpa-se.
};


export const production: Knex.Config  = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname,'..', 'seeds') // Função que automatiza inserção de muitos dados numa tabela de uma vez só.
    },
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT) || 5432, // Porta 5432 é padrão do POSTGR.
        ssl: {rejectUnauthorized: false}
    }
};