import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - GetAll', () => {


    it('Mostrar todos os registos', async () =>{  // Um cenário de teste
        const res1 = await testServer
            .post('/cidades')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                nome: 'Porto'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade

        const resProcura = await testServer
            .get('/cidades')
            .send();

        expect(Number(resProcura.header['x-total-count'])).toBeGreaterThan(0);
        expect(resProcura.statusCode).toEqual(StatusCodes.OK);
        expect(resProcura.body.length).toBeGreaterThan(0);
    });
});



