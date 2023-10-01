import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - DeleteById', () => {


    it('Apaga registo', async () => {  // Um cenário de teste
        const res1 = await testServer
            .post('/cidades/')
            .send({
                nome: 'Porto'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`);

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });


    it('Tenta apagar registo pelo id que não existe', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .get('/cidades/9999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('errors.default'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



