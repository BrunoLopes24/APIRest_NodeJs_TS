import { PasswordCrypto } from '../../../services/PasswordCrypto';
import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUtilizador } from '../../models';



export const create = async (utilizador: Omit<IUtilizador,'id'>): Promise<number | Error> =>{
    try{
        const hashedPassword = await PasswordCrypto.hashPassword(utilizador.password);
        // Insere na BD e retorna para a const o ID
        const [result] = await Knex(EtableNames.utilizador).insert({...utilizador, password: hashedPassword}).returning('id');

        if(typeof result === 'object'){ // Se o tipo da const for object
            return result.id; // retorna ID (pode ser string)
        }else if (typeof result === 'number'){
            return result;
        }
        return new Error('Erro ao registar ');
    }catch(e){
        console.log(e);
        return new Error('Erro ao registar ');
    }

};