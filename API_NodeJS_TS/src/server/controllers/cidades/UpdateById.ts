import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../middleware';
import { ICidades } from '../../db/models';
import { CidadesProvider } from '../../db/providers/cidades';

interface IParamProps{
    id?: number;
}
interface IBodyProps extends Omit<ICidades,'id'>{}

export const updateByIdvalidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
}));

export const updateById =async (req:Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID required'
            }
        });
    }

    const result = await CidadesProvider.updateById(req.params.id, req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};