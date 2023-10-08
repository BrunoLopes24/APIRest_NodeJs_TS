import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import {beforeAll} from '@jest/globals';


describe('Pessoas - Create', () => {
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


    it('Cria Registo', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                cidadeId,
                nomeCompleto: 'Josefino',
                email: 'lopesB@gmail.com'
            }); 

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(typeof res1.body).toEqual('number'); // Verifica o tipo do id que tem de ser number.
    });

    it('Cria Registo 2', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                cidadeId,
                nomeCompleto: 'Josefino',
                email: 'josefino@gmail.com'
            }); 

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(typeof res1.body).toEqual('number'); // Verifica o tipo do id que tem de ser number.
    });

    it('Cria Registo com mail duplicado', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                cidadeId,
                nomeCompleto: 'Josefino',
                email: 'lopessB@gmail.com'
            }); 

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                cidadeId,
                nomeCompleto: 'Duplicado',
                email: 'lopessB@gmail.com' //Duplicado
            }); 

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res2.body).toHaveProperty('errors.default'); // Verifica o tipo do id que tem de ser number.
    });

    it('Tenta criar Registo com nome curto', async () => {  // Outro cenário de teste
        const res1 = await testServer.post('/pessoas')
            .set({Authorization: 'Bearer ' + accessToken})
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                cidadeId,
                nome: 'Ma',
                email: 'mailas@test.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('error.body.nomeCompleto'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



