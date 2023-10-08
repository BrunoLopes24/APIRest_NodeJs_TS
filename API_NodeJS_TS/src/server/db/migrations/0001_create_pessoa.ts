import { Knex } from 'knex';
import { EtableNames } from '../ETableNames';


export async function up(knex: Knex) { // Cria tabela(s)
    return knex.schema.createTable(EtableNames.pessoa, table => {   // Tabela a criar, colunas da tabela
        table.bigIncrements('id')
            .primary()
            .index();

        table.string('nomeCompleto')
            .index()
            .notNullable();

        table.string('email')
            .unique()
            .notNullable();

        table.bigInteger('cidadeId')
            .notNullable()
            .index()
            .references('id')
            .inTable(EtableNames.cidade)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        
        table.comment('Tabela para armazenar pessoas no sistema');
    }).then(() => {
        console.log(`# Created table ${ EtableNames.pessoa }`);
    });
}


export async function down(knex: Knex) { // Quando for necessário fazer rollback
    return knex.schema.dropTable(EtableNames.pessoa).then(() => {
        console.log(`# Dropped table ${ EtableNames.pessoa }`);
    });
}

