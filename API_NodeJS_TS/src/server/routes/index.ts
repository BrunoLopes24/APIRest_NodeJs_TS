// Ficheiro onde ficam as endpoints.
import { Router } from 'express'; //Importa Middleware
import { CidadesController, PessoasController, UtilizadoresController } from '../controllers';
const router = Router();


//Endpoint "padrão" onde mostra o server a funcionar
router.get('/', (req,res) => {
    return res.send(`Servidor a funcionar na porta ${process.env.PORT||3000}!`);
} );

// endpoint,middleware,controller


// CIDADES
router.get('/cidades', CidadesController.getAllValidation ,CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdvalidation ,CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdvalidation ,CidadesController.updateById);
router.post('/cidades', CidadesController.createValidation ,CidadesController.create);
router.delete('/cidades/:id', CidadesController.deleteByIdvalidation ,CidadesController.deleteById);

// PESSOAS 
router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', PessoasController.getByIdvalidation ,PessoasController.getById);
router.put('/pessoas/:id', PessoasController.updateByIdvalidation ,PessoasController.updateById);
router.post('/pessoas', PessoasController.createValidation ,PessoasController.create);
router.delete('/pessoas/:id', PessoasController.deleteByIdvalidation ,PessoasController.deleteById);

// UTILIZADORES
router.post('/entrar', UtilizadoresController.signInValidation ,UtilizadoresController.signIn);
router.post('/registar', UtilizadoresController.signUpValidation ,UtilizadoresController.signUp);

export default router; //Exporta o router para ficheiro app.ts