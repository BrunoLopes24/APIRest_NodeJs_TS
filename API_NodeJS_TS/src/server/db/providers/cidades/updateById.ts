import { EtableNames } from '../../ETableNames';
import { ICidades } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, cidade: Omit<ICidades, 'id'>): Promise<void | Error> => {
    try{
        const result = await Knex(EtableNames.cidade)
            .update(cidade)
            .where('id', '=', id);

        if (result > 0) return;
        return new Error('Erro ao actualizar o registo.');
    }catch(error){
        console.log(error);
        return new Error('Erro ao actualizar o registo');
    }
};