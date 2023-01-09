"use strict";

const Database = use("Database");

var SqlString = require("sqlstring");

class ProductController {
  index({ view }) {
    return view.render("admin/products/all");
  }
  async store({ request, response }) {
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
    "${SqlString.escape(title)}",
    "${SqlString.escape(sku)}",
    "${SqlString.escape(material)}",
    "${SqlString.escape(description)}",
    ${parseInt(1)},
    ${SqlString.escape(qty)},
    ${SqlString.escape(size)},
    ${parseInt(1)}
  )
    `
      );

      return response.redirect("/admin/products");
    } catch (error) {
      return response.redirect("/admin/products/create");
    }
  }
  create({ view }) {
    return view.render("admin/products/create");
  }
  show({ view }) {
    return view.render("admin/products/show");
  }
  edit({ view }) {
    return view.render("admin/products/edit");
  }
  update() {}
  delete() {}
}
module.exports = ProductController;
