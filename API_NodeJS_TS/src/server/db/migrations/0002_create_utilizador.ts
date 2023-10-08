import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up(knex: Knex) { // Cria tabela(s)
    return knex.schema.createTable(EtableNames.utilizador, table => {   // Tabela a criar, colunas da tabela
        table.bigIncrements('id')
            .primary()
            .index();

        table.string('nome')
            .notNullable()
            .checkLength('>', 3);

        table.string('email')
            .index()
            .unique()
            .notNullable()
            .checkLength('>', 5);

        table.string('password')
            .checkLength('>=', 6)
            .notNullable();
        
        table.comment('Tabela para armazenar utilizadores no sistema');
    }).then(() => {
        console.log(`# Created table ${ EtableNames.utilizador }`);
    });
}


export async function down(knex: Knex) { // Quando for necessário fazer rollback
    return knex.schema.dropTable(EtableNames.utilizador).then(() => {
        console.log(`# Dropped table ${ EtableNames.utilizador }`);
    });
}

