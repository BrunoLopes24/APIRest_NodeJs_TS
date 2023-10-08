import * as create from '../utilizadores/Create';
import * as getByEmail from '../utilizadores/GetByEmail';

// Agrupa todos os controllers (da Cidade) em uma variável.
export const UtilizadoresProvider = {
    ...create,
    ...getByEmail,
};