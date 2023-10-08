import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';
import { IUtilizador } from '../../db/models';
import { UtilizadoresProvider } from '../../db/providers/utilizadores';


// Middleware de validação (JSON Body)
interface IBodyProps extends Omit<IUtilizador,'id'| 'nome'>{}
 
//export const createValidation = validation('body',bodyValidation); //  Exporta a variável que contém as verificações do yup e associa à variável que está na middleware
export const signInValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(6),
    })),
}));


export const signIn= async (req: Request<{},{},IBodyProps>, res: Response) =>{

    const {email, password} = req.body;

    const result = await UtilizadoresProvider.getByEmail(email);    

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou senha são inválidos'
            }
        });
    }

    if (password !== result.password){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou senha são inválidos'
            }
        });
    }else {
        return res.status(StatusCodes.OK).json({
            accessToken: 'teste.teste.teste'
        });
    }

    //return res.status(StatusCodes.CREATED).json(result);
};