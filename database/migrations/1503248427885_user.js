"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.raw(
      `CREATE TABLE users(
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        f_name VARCHAR(60) NOT NULL,
        l_name VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL UNIQUE,
        phone_number VARCHAR(20) NOT NULL,
        birth_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`
    );
  }

  down() {
    this.raw(`DROP TABLE users`);
  }
}

module.exports = UserSchema;
