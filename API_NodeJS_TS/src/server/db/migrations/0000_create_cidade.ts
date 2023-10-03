import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up(knex: Knex) { // Cria tabela(s)
    return knex.schema.createTable(EtableNames.cidade, table => {   // Tabela a criar, colunas da tabela
        table.bigIncrements('id').primary().index();
        table.string('nome', 150).index().notNullable();
        
        table.comment('Tabela para armazenar cidades no sistema');
    }).then(() => {
        console.log(`# Created table ${ EtableNames.cidade }`);
    });
}


export async function down(knex: Knex) { // Quando for necessário fazer rollback
    return knex.schema.dropTable(EtableNames.cidade).then(() => {
        console.log(`# Dropped table ${ EtableNames.cidade }`);
    });
}

