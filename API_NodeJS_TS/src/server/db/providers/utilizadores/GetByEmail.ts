import { EtableNames } from '../../ETableNames';
import { IUtilizador } from '../../models';
import { Knex } from '../../knex';


export const getByEmail = async (email: string): Promise<IUtilizador | Error> => {
    try{
        const result = await Knex(EtableNames.utilizador)
            .select('*')
            .where('email', '=', email)
            .first();

        if (result) return result;

        return new Error('Registo não encontrado');
    }catch(error){
        console.log(error);
        return new Error('Erro ao consultar o registo');
    }
};