import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(EtableNames.cidade).count<[{ count: number }]>('* as count');

    if (!Number.isInteger(count) || Number(count > 0)) return;
    const cidadesToInsert = cidadeSantarem.map(nomeDaCidade => ({nome: nomeDaCidade})); //Tranformar lista de strings em um objecto.
    await knex(EtableNames.cidade).insert(cidadesToInsert);
    
    
};
const cidadeSantarem = [
    'Abrantes',
    'Alcanena',
    'Almeirim',
    'Alpiarça',
    'Benavente',
    'Cartaxo',
    'Chamusca',
    'Constância',
    'Coruche',
    'Entroncamento',
    'Ferreira do Zêzere',
    'Golegã',
    'Mação',
    'Ourém',
    'Rio Maior',
    'Salvaterra de Magos',
    'Santarém',
    'Sardoal',
    'Tomar',
    'Torres Novas',
    'Vila Nova da Barquinha'
];