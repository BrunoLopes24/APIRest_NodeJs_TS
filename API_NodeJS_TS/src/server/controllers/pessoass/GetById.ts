import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../middleware';
import { PessoasProvider } from '../../db/providers/pessoa'; 

interface IParamProps{
    id?: number;
}

export const getByIdvalidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    })),
}));





export const getById =async (req:Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID required'
            }
        });
    }

    const result = await PessoasProvider.getById(req.params.id);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};