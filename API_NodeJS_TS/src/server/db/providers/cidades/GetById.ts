import { EtableNames } from '../../ETableNames';
import { ICidades } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<ICidades | Error> => {
    try{
        const result = await Knex(EtableNames.cidade)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) return result;

        return new Error('Registo não encontrado');
    }catch(error){
        console.log(error);
        return new Error('Erro ao consultar o registo');
    }
};