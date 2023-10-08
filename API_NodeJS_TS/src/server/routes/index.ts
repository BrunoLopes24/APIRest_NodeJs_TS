// Ficheiro onde ficam as endpoints.
import { Router } from 'express'; //Importa Middleware
import { CidadesController, PessoasController, UtilizadoresController } from '../controllers';
import { ensureAuth } from '../middleware';
const router = Router();


//Endpoint "padrão" onde mostra o server a funcionar
router.get('/', (req,res) => {
    return res.send(`Servidor a funcionar na porta ${process.env.PORT||3000}!`);
} );

// endpoint,middleware,controller


// CIDADES
router.get('/cidades', ensureAuth, CidadesController.getAllValidation ,CidadesController.getAll);
router.get('/cidades/:id', ensureAuth, CidadesController.getByIdvalidation ,CidadesController.getById);
router.put('/cidades/:id', ensureAuth, CidadesController.updateByIdvalidation ,CidadesController.updateById);
router.post('/cidades', ensureAuth, CidadesController.createValidation ,CidadesController.create);
router.delete('/cidades/:id', ensureAuth, CidadesController.deleteByIdvalidation ,CidadesController.deleteById);

// PESSOAS 
router.get('/pessoas', ensureAuth, PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', ensureAuth, PessoasController.getByIdvalidation ,PessoasController.getById);
router.put('/pessoas/:id', ensureAuth, PessoasController.updateByIdvalidation ,PessoasController.updateById);
router.post('/pessoas', ensureAuth, PessoasController.createValidation ,PessoasController.create);
router.delete('/pessoas/:id', ensureAuth, PessoasController.deleteByIdvalidation ,PessoasController.deleteById);

// UTILIZADORES
router.post('/entrar', UtilizadoresController.signInValidation ,UtilizadoresController.signIn);
router.post('/registar', UtilizadoresController.signUpValidation ,UtilizadoresController.signUp);







export default router; //Exporta o router para ficheiro app.ts