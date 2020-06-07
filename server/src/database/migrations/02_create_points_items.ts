import Knex from 'knex';

export async function up (knex: Knex) {
    return knex.schema.createTable('point_item', table => {
        table.increments('id').primary();
        table.integer('id_point')
            .notNullable()
            .references('id')
            .inTable('points');

        table.string('id_item')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}