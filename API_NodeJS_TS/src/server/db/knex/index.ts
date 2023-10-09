import knex from 'knex';
import pg from 'pg';
import { development, test, production } from './Environment';
import 'dotenv/config';

if (process.env.NODE_ENV === 'production') {
    pg.types.setTypeParser(20, 'text', parseInt); // O ID que é para vir em INT , no PostgrSQL vem em string. | Esta parte converte de string para INT.
}

const getEnvironmnent = () => {
    switch (process.env.NODE_ENV) {
        case 'production': return production;
        case 'test': return test;

        default: return development;
    }
};

export const Knex = knex(getEnvironmnent());