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
      let img_url = post.img_url;
      await Database.raw(
        `
   INSERT INTO products (
    title,
    sku,
    img_url,
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
    ${sqlString.escape(img_url)},
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
  async show({ view, response, request, params }) {
    try {
      let product = await Database.raw(`
      SELECT products.id, products.title,products.sku,products.img_url, products.description,
      brands.title as brand, concat(users.f_name, " ", users.l_name )as user,
      products.material,products.qty,products.size, products.user_id,
      products.created_at
      FROM products
      INNER JOIN brands
      ON products.brand_id = brands.id
      INNER JOIN users
      ON products.user_id = users.id
      WHERE products.id = ${params.id}
      ORDER BY created_at ASC
      LIMIT 1
      `);
      product = product[0][0];

      return view.render("admin/products/show", { product });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async edit({ view, response, request, params }) {
    try {
      let product = await Database.raw(`
      SELECT products.id, products.title,products.sku,products.img_url, products.description,
      brands.title as brand, concat(users.f_name, " ", users.l_name )as user,
      products.material,products.qty,products.size, products.user_id,
      products.created_at
      FROM products
      INNER JOIN brands
      ON products.brand_id = brands.id
      INNER JOIN users
      ON products.user_id = users.id
      WHERE products.id = ${params.id}
      ORDER BY created_at ASC
      LIMIT 1
      `);

      product = product[0][0];

      return view.render("admin/products/edit", { product });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async update({ response, request, params }) {
    try {
      const post = request.post();
      const id = params.id;
      let title = post.title;
      let sku = post.sku;
      let material = post.material;
      let description = post.description;
      let qty = post.qty;
      let size = post.size;
      let img_url = post.img_url;
      await Database.raw(
        `
   UPDATE products
   SET
   title = ${sqlString.escape(title)},
   sku = ${sqlString.escape(sku)},
   img_url = ${sqlString.escape(img_url)},
   material = ${sqlString.escape(material)},
   description = ${sqlString.escape(description)},
   brand_id = ${parseInt(1)},
   qty = ${parseInt(qty)},
   size = ${sqlString.escape(size)},
   user_id = ${parseInt(1)} 
   WHERE id = ${id}
   `
      );

      return response.redirect(`/admin/products/${id}`);
    } catch (error) {
      return response.redirect("back");
    }
  }
  async delete({ response, request, params }) {
    try {
      const post = request.post();
      const id = params.id;
      let title = post.title;
      let sku = post.sku;
      let material = post.material;
      let description = post.description;
      let qty = post.qty;
      let size = post.size;
      let img_url = post.img_url;
      await Database.raw(
        `
        DELETE FROM products
    WHERE id = ${id}
   `
      );

      return response.redirect(`/admin/products`);
    } catch (error) {
      return response.redirect("back");
    }
  }
}
module.exports = ProductController;
