import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import {beforeAll} from '@jest/globals';


describe('Pessoas - DeleteById', () => {
    let cidadeId: number | undefined = undefined;

    beforeAll(async  () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({nome: 'Teste'});

        cidadeId = resCidade.body;
    });

    it('Apaga registo', async () => {  // Um cenário de teste
        const res1 = await testServer
            .post('/pessoas/')
            .send({
                cidadeId,
                nomeCompleto: 'Juca',
                email: 'jucadelete@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`);

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });


    it('Tenta apagar registo pelo id que não existe', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .get('/pessoas/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('errors.default'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



