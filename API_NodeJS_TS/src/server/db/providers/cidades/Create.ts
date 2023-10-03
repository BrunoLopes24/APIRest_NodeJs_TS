/* Providers são classes que fornecem serviços para outros componentes do aplicativo, como controladores. Esses serviços podem incluir, por exemplo, acesso a bancos de dados, autenticação de usuários, gerenciamento de sessões, entre outros. */


import { EtableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidades } from '../../models';



export const create = async (cidade: Omit<ICidades,'id'>): Promise<number | Error> =>{
    try{
        // Insere na BD e retorna para a const o ID
        const [result] = await Knex(EtableNames.cidade).insert(cidade).returning('id');

        if(typeof result === 'object'){ // Se o tipo da const for object
            return result.id; // retorna ID (pode ser string)
        }else if (typeof result === 'number'){
            return result;
        }
        return new Error('Erro ao registar ');
    }catch(e){
        console.log(e);
        return new Error('Erro ao registar ');
    }

};