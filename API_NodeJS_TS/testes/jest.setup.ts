import supertest from 'supertest';
import { app } from '../src/server/app';

export const testServer = supertest(app);