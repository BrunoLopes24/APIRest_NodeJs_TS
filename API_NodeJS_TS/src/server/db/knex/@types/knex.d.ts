//Definição de tipagens para o TS
import { ICidade } from '../../models';

declare module 'knex/types/tables'{
    interface Tables{
        cidade: ICidade;
        //pessoa: IPessoa
        //utilizador: IUtilizador
    }
}
