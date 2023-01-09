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
      SELECT * FROM products
      `);
      allProducts = allProducts[0];

      return view.render("admin/products/all", { allProducts });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async store({ view, response, request }) {
    try {
      const post = request.post();
      let title = post.title;
      let sku = post.sku;
      let material = post.material;
      let description = post.description;
      let qty = post.qty;
      let size = post.size;
      await Database.raw(
        `
   INSERT INTO products (
    title,
    sku,
    material,
    description,
    brand_id,
    qty,
    size,
    user_id
  )
VALUES (
    ${sqlString.escape(title)},
    ${sqlString.escape(sku)},
    ${sqlString.escape(material)},
    ${sqlString.escape(description)},
    ${parseInt(1)},
    ${parseInt(qty)},
    ${sqlString.escape(size)},
    ${parseInt(1)}
  )
    `
      );

      return response.redirect("/admin/products");
    } catch (error) {
      return response.redirect("back");
    }
  }
  create({ view, response, request }) {
    return view.render("admin/products/create");
  }
  show({ view, response, request }) {
    return view.render("admin/products/show");
  }
  edit({ view, response, request }) {
    return view.render("admin/products/edit");
  }
  update({ response, request }) {}
  delete({ response, request }) {}
}
module.exports = ProductController;
