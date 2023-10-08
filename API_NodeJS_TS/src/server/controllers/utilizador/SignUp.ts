import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';
import { IUtilizador } from '../../db/models';
import { UtilizadoresProvider } from '../../db/providers/utilizadores';


// Middleware de validação (JSON Body)
interface IBodyProps extends Omit<IUtilizador,'id'>{}
 
//export const createValidation = validation('body',bodyValidation); //  Exporta a variável que contém as verificações do yup e associa à variável que está na middleware
export const signUpValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(6),
    })),
}));


export const signUp= async (req: Request<{},{},IBodyProps>, res: Response) =>{

    const result = await UtilizadoresProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message,
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};