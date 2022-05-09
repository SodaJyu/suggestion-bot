/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("negative_suggestions", (table) => {
        table.increments("id").primary();
        table.increments("popularity");
        table.string("suggestion", 128).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable("negative_suggestions");
};
