import supertest from 'supertest';
import { app } from '../src/server/app';
import { Knex } from '../src/server/db/knex';
import {beforeAll, afterAll} from '@jest/globals';

beforeAll( async () => { // Antes de executar os testes, fará o migration das tabelas.
    await Knex.migrate.latest();
    await Knex.seed.run();
});

afterAll (async () => {
    await Knex.destroy();
});

export const testServer = supertest(app);
