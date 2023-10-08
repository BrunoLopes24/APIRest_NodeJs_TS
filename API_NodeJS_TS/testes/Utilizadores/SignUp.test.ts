import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import {beforeAll} from '@jest/globals';



describe('Utilizador - SignUp', () => {

    it('Cria Registo', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/registar')
            .send({ //Neste cenário, vai enviar (post) um dado de um Utilizador
                email: 'lopesb@gmail.com',
                password: '1234567',
                nome: 'Bruno Lopes'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(typeof res1.body).toEqual('number'); // Verifica o tipo do id que tem de ser number.
    });




    it('Tenta criar Registo com email com espaço', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .post('/registar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                email: 'lopessb@ gmail.com',
                password: '1234566370',
                nome: 'Bruno Lopees'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('error.body.email'); // Verifica o tipo do id que tem de ser number.
    });




    it('Cria Registo com mail duplicado', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/registar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                email: 'lopessB@gmail.com',
                password: 'owwowww',
                nome: 'Bruno Lopes'
            }); 

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/registar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma pessoa
                email: 'lopessB@gmail.com',
                password: 'owwowww',
                nome: 'Bruno Lopes'
            }); 

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res2.body).toHaveProperty('errors.default'); // Verifica o tipo do id que tem de ser number.
    });
});



