import {Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../middleware';

interface IParamProps{
    id?: number;
}
interface IBodyProps{
   nome: string;
}

export const updateByIdvalidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required(),
    })),
}));

export const updateById =async (req:Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (Number(req.params.id) === 9999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
            default: 'Registo não encontrado'
        }
    });

    return res.status(StatusCodes.NO_CONTENT).send('UPDATEBYID | Não Implementado!');
};