import * as create from '../cidades/Create';
import * as getAll from '../cidades/GetAll';
import * as getById from '../cidades/GetById';
import * as updateById from '../cidades/updateById';
import * as deleteById from '../cidades/DeleteById';
import * as count from '../cidades/Count';

// Agrupa todos os controllers (da Cidade) em uma variável.
export const CidadesProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
    ...count
};