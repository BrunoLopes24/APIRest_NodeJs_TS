import { EtableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IPessoa | Error> => {
    try{
        const result = await Knex(EtableNames.pessoa)
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