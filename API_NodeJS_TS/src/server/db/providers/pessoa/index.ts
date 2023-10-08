import * as create from '../pessoa/Create';
import * as getAll from '../pessoa/GetAll';
import * as getById from '../pessoa/GetById';
import * as updateById from '../pessoa/updateById';
import * as deleteById from '../pessoa/DeleteByid';
import * as count from '../pessoa/Count';

// Agrupa todos os controllers (da Cidade) em uma variável.
export const PessoasProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
    ...count
};