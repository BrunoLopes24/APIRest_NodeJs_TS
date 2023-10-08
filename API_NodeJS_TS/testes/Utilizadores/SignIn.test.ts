import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Utilizadores - SignIn', () => {
    beforeAll(async () => {
        await testServer.post('/registar').send({
            nome: 'Bruno Lopes',
            password: '1234567',
            email: 'lopessb@gmail.com'
        });
    });


    it('Login', async () => {  // Um cenário de teste
        const res1 = await testServer
            .post('/entrar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                password: '1234567',
                email: 'lopessb@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.OK); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Password errado', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .post('/entrar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                password: '12333337',
                email: 'lopesb@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('errors.default'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });

    it('Email errado', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .post('/entrar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                password: '12333337',
                email: 'lopesssssb@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('errors.default'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });

    it('Email sem @', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .post('/entrar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                password: '12333337',
                email: 'lopesb gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('error.body.email'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });

    it('Sem senha', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .post('/entrar')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                password: '',
                email: 'lopesb@gmail.com',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('error.body.password'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



