import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
    if (Number(req.params.id) === 9999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
            default: 'Registo não encontrado'
        }
    });

    return res.status(StatusCodes.NO_CONTENT).send('DELETE | Não Implementado!');
};