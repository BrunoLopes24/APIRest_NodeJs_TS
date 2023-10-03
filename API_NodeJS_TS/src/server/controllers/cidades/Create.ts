import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';
import { ICidades } from '../../db/models';
import { CidadesProvider } from '../../db/providers/cidades';


// Middleware de validação (JSON Body)
interface IBodyProps extends Omit<ICidades,'id'>{}

//export const createValidation = validation('body',bodyValidation); //  Exporta a variável que contém as verificações do yup e associa à variável que está na middleware
export const createValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
    })),
}));






export const create = async (req: Request<{},{},ICidades>, res: Response) =>{

    const result = await CidadesProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message,
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};