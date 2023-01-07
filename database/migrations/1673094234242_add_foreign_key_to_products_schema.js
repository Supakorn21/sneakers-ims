"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddForeignKeyToProductsSchema extends Schema {
  up() {
    this.raw(`
     ALTER TABLE products 
     ADD CONSTRAINT brand_id
      FOREIGN KEY (brand_id) REFERENCES brands(id)
    `);
  }

  down() {
    this.raw(`
    ALTER TABLE products
    DROP FOREIGN KEY brand_id
    `);
  }
}

module.exports = AddForeignKeyToProductsSchema;
