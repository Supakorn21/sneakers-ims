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
      SELECT products.id, products.title,products.sku, products.img_url,
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

  async store({ response, request }) {
    try {
      const post = request.post();
      let title = post.title;
      let sku = post.sku;
      let material = post.material;
      let description = post.description;
      let qty = post.qty;
      let size = post.size;
      let brand_id = post.brand_id;
      let img_url = post.img_url;
      //       await Database.raw(
      //         `
      //    INSERT INTO products (
      //     title,
      //     sku,
      //     img_url,
      //     material,
      //     description,
      //     brand_id,
      //     qty,
      //     size,
      //     user_id
      //   )
      // VALUES (
      //     ${sqlString.escape(title)},
      //     ${sqlString.escape(sku)},
      //     ${sqlString.escape(img_url)},
      //     ${sqlString.escape(material)},
      //     ${sqlString.escape(description)},
      //     ${parseInt(brand_id)},
      //     ${parseInt(qty)},
      //     ${sqlString.escape(size)},
      //     ${parseInt(1)}
      //   )
      //     `
      //       );

      return { message: "Receive data successfully", post };

      return response.redirect("/admin/products");
    } catch (error) {
      return response.redirect("back");
    }
  }
}

module.exports = ProductController;
