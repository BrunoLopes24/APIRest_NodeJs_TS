import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - Create', () => {


    it('Cria Registo', async ()=>{  // Um cenário de teste
        const res1 = await testServer.post('/cidades').send({ //Neste cenário, vai enviar (post) um dado de uma cidade
            nome: 'Porto'
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(typeof res1.body).toEqual('number'); // Verifica o tipo do id que tem de ser number.
    });

    it('Tenta criar Registo com nome curto', async () => {  // Outro cenário de teste
        const res1 = await testServer.post('/cidades').send({ //Neste cenário, vai enviar (post) um dado de uma cidade
            nome: 'le'
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('error.body.nome'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



