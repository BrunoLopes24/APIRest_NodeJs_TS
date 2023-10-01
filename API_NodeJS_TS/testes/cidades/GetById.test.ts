import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - GetById', () => {


    it('Procura por ID', async ()=>{  // Um cenário de teste
        const res1 = await testServer
            .post('/cidades')
            .send({ //Neste cenário, vai enviar (post) um dado de uma cidade
                nome: 'Porto'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        
        const resProcurada = await testServer
            .get(`/cidades/${res1.body}`)
            .send();

        expect(resProcurada.statusCode).toEqual(StatusCodes.OK);
        expect(resProcurada.body).toHaveProperty('nome');
    });

    it('Procura por registo que não existe', async () => {  // Outro cenário de teste
        const res1 = await testServer
            .get('/cidades/9999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); // Vai fazer teste. Expect() - O que recebo | toEqual()- O que espero receber na realidade
        expect(res1.body).toHaveProperty('errors.default'); // Verifica o body tem propriedade dentro de errors tenha propriedade nome. Error -> body -> nome
    });
});



