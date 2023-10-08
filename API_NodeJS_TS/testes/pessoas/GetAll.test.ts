import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import {beforeAll} from '@jest/globals';



describe('Pessoas - GetAll', () => {
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
    let cidadeId: number | undefined = undefined;

    beforeAll(async  () => {
        const resCidade = await testServer
            .post('/cidades')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({nome: 'Teste'});

        cidadeId = resCidade.body;
    });

    it('Mostrar todos os registos', async () =>{  // Um cenário de teste
        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                cidadeId,
                nomeCompleto: 'Bruno',
                email: 'lopesB@gmail.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade

        const resProcura = await testServer
            .get('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send();

        expect(Number(resProcura.header['x-total-count'])).toBeGreaterThan(0);
        expect(resProcura.statusCode).toEqual(StatusCodes.OK);
        expect(resProcura.body.length).toBeGreaterThan(0);
    });
});



