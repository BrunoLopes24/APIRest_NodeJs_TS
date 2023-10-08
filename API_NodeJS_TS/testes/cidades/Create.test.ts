import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import {beforeAll} from '@jest/globals';


describe('Cidades - Create', () => {
    let accessToken = '';

    beforeAll(async () => {
        const email = 'create-cidade@gmail.com';
        await testServer
            .post('/registar')
            .send({
                nome: 'Teste',
                email,
                password: '123456'
            });
        const resLogin = await testServer
            .post('/entrar')
            .send({
                email,
                password: '123456'
            });
        accessToken = resLogin.body.accessToken;
    });

    it('Cria Registo sem token de acesso', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/cidades')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                nome: 'Porto'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('errors.default'); // Verifica o tipo do id que tem de ser number.
    });



    it('Cria Registo', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                nome: 'Porto'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(typeof res1.body).toEqual('number'); // Verifica o tipo do id que tem de ser number.
    });

    it('Tenta criar Registo com nome curto', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .post('/cidades')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                nome: 'le'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('error.body.nome'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



