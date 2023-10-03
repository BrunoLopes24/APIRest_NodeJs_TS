import * as create from './Create';
//import * as getAll from './GetAll';
//import * as getById from './GetById';
//import * as updateById from './UpdateById';
//import * as deleteById from './DeleteById';

// Agrupa todos os controllers (da Cidade) em uma variável.
export const CidadesProvider = {
    ...create,
    //...getAll,
    //...getById,
    //...updateById,
    //...deleteById,
};