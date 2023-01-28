"use strict";
const Database = use("Database");
const sqlString = require("sqlstring");

class ProductController {
  async index({ view, response, request }) {
    try {
      // let title = post.title;
      // let sku = post.sku;
      // let material = post.material;
      // let description = post.description;
      // let qty = post.qty;
      // let size = post.size;

      let allProducts = await Database.raw(`
      SELECT products.id, products.title,products.sku,
      brands.title as brand, concat(users.f_name, " ", users.l_name )as user,
      products.material,products.qty,products.size, products.user_id,
      products.created_at
      FROM products
      INNER JOIN brands
      ON products.brand_id = brands.id
      INNER JOIN users
      ON products.user_id = users.id ORDER BY created_at ASC
      `);
      allProducts = allProducts[0];

      return allProducts;
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
}

module.exports = ProductController;
