import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PessoasProvider } from '../../db/providers/pessoa';
import * as yup from 'yup';

import { validation } from '../../middleware';

interface IParamProps{
    id?: number;
}

export const deleteByIdvalidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    })),
}));

export const deleteById =async (req:Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID required'
            }
        });
    }

    const result = await PessoasProvider.deleteById(req.params.id);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    
    
    return res.status(StatusCodes.NO_CONTENT).send('DELETE | Não Implementado!');
};