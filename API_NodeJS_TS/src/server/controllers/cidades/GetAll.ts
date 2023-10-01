import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';


interface IqueryPops {  // Serão todos os parametros a receber no query params
    page?: number;
    limit?: number;
    filter?: string;
}


export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IqueryPops>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        filter: yup.string(),
    })),
}));


export const getAll = async (req: Request< {}, {}, {}, IqueryPops>, res: Response) =>{
    res.setHeader('accss-control-expose-headers', 'x-total-count'); //Diz que o x-total-count fica disponivel (exposto) ao front
    res.setHeader('x-total-count', 1); // e que começa por 1.

    return res.status(StatusCodes.OK) 
        .json([{ //Array de OBJECTO
            id: 1,
            nome: 'Porto'
        }]);
};