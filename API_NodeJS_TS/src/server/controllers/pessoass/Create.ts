import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../db/models';
import { PessoasProvider } from '../../db/providers/pessoa';


// Middleware de validação (JSON Body)
interface IBodyProps extends Omit<IPessoa, 'id'> { }

//export const createValidation = validation('body',bodyValidation); //  Exporta a variável que contém as verificações do yup e associa à variável que está na middleware
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required(),
    })),
}));

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {

    const result = await PessoasProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};