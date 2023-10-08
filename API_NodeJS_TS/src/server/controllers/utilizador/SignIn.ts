import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware'; // Importa a validação do middleware
import { StatusCodes } from 'http-status-codes';
import { IUtilizador } from '../../db/models';
import { UtilizadoresProvider } from '../../db/providers/utilizadores';
import { PasswordCrypto } from '../../services/PasswordCrypto';
import { JWTService } from '../../services';


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

    const utilizador = await UtilizadoresProvider.getByEmail(email);    

    if (utilizador instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou senha são inválidos'
            }
        });
    }

    const passMatch = await PasswordCrypto.verifyPassword(password, utilizador.password);

    if (!passMatch){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou senha são inválidos'
            }
        });
    }else {

        const accessToken = JWTService.sign({uid: utilizador.id});

        if (accessToken === 'JWT_SECRET_NOT_FOUND'){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors:{
                    default: 'Erro ao gerar Token de acesso.'
                }
            });
        }


        return res.status(StatusCodes.OK).json({accessToken});
    }

    //return res.status(StatusCodes.CREATED).json(result);
};