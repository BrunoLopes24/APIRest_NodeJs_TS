// Ficheiro onde ficam as endpoints.
import { Router } from 'express'; //Importa Middleware
import { CidadesController } from '../controllers';
const router = Router();


//Endpoint "padrão" onde mostra o server a funcionar
router.get('/', (req,res) => {
    return res.send(`Servidor a funcionar na porta ${process.env.PORT||3000}`);
} );

// endpoint,middleware,controller

router.get('/cidades', CidadesController.getAllValidation ,CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdvalidation ,CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdvalidation ,CidadesController.updateById);
router.post('/cidades', CidadesController.createValidation ,CidadesController.create);
router.delete('/cidades/:id', CidadesController.deleteByIdvalidation ,CidadesController.deleteById);


export default router; //Exporta o router para ficheiro app.ts