import * as signIn from './SignIn';
import * as signUp from './SignUp';

// Agrupa todos os controllers (da Cidade) em uma variável.
export const UtilizadoresController = {
    ...signIn, 
    ...signUp,
};