import { EtableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
    try {

        const [{ count }] = await Knex(EtableNames.cidade)
            .where('id', '=', pessoa.cidadeId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('A cidade usada no registo não foi encontrado.');
        }


        const result = await Knex(EtableNames.pessoa)
            .update(pessoa)
            .where('id', '=', id);

        if (result > 0) return;
        return new Error('Erro ao actualizar o registo.');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao actualizar o registo');
    }
};