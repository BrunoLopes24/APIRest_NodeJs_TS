import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';


// Middleware de validação (JSON Body)
interface ICidade {
    nome: string;
}

//export const createValidation = validation('body',bodyValidation); //  Exporta a variável que contém as verificações do yup e associa à variável que está na middleware
export const createValidation = validation((getSchema)=>({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
}));




 

export const create = async (req: Request<{},{},ICidade>, res: Response) =>{
    console.log(req.body);
    return res.status(StatusCodes.CREATED).json(1);
};