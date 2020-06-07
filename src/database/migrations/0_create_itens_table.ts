import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("itens", table => {
    table.increments("id").primary();
    table.string("name", 150).notNullable();
    table.string("path_image").notNullable();
  });
};

export async function down(knex: Knex) {
  return knex.schema.dropTable("itens");
};
