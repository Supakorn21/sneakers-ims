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
      SELECT products.id, products.title,products.sku, products.price,
      products.description, products.img_url,
      brands.title as brand, concat(users.f_name, " ", users.l_name )as user,
      products.material,products.qty,products.size, products.brand_id , products.user_id,
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
      let f_name = post.form.f_name;
      let l_name = post.form.l_name;
      let address = post.form.address;
      let address_2 = post.form.address_2;
      let city = post.form.city;
      let state = post.form.state;
      let country = post.form.country;
      let payment_type = post.form.payment_type;
      let user_id = post.form.user_id;
      let zipcode = post.form.zipcode;

      const order = await Database.raw(
        `
         INSERT INTO orders (f_name,l_name, address, address_2, city, state, zipcode,
          country, payment_type, user_id
        )
      VALUES (
          ${sqlString.escape(f_name)},
          ${sqlString.escape(l_name)},
          ${sqlString.escape(address)},
          ${sqlString.escape(address_2)},
          ${sqlString.escape(city)},
          ${sqlString.escape(state)},
          ${sqlString.escape(zipcode)},
          ${sqlString.escape(country)},
          ${sqlString.escape(payment_type)},
          ${parseInt(1)}
        );
          `
      );

      const order_id = order[0].insertId;
      await post.allItems.map(async (item) => {
        try {
          let insertItem = await Database.raw(
            `
         INSERT INTO items (title,sku, price, material, description, brand_id, qty,
          size, order_id, user_id
        )
      VALUES (
          ${sqlString.escape(item.productInfo.title)},
          ${sqlString.escape(item.productInfo.sku)},
          ${sqlString.escape(item.productInfo.price)},
          ${sqlString.escape(item.productInfo.material)},
          ${sqlString.escape(item.productInfo.description)},
          ${sqlString.escape(item.productInfo.brand_id)},
          ${sqlString.escape(item.qtyBuying)},
          ${sqlString.escape(item.productInfo.size)},
          ${sqlString.escape(order_id)},
          ${parseInt(1)}
        );
          `
          );
          let updateProduct = await Database.raw(`
           UPDATE products 
            SET qty = qty- ${item.qtyBuying}
           WHERE id = ${item.productInfo.id};
        `);
          // console.log("Success update product");

          return insertItem, updateProduct;
        } catch (error) {
          // console.log("Not Success");
          console.log(error);
          return {
            status: "error",
            message: "Can't save item or update product",
            error: error.sqlMessage,
          };
        }
      });

      return {
        status: "success",
        message: "Saved Order",
      };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message: "Can't save order",
        error: error.sqlMessage,
      };
    }
  }
}

module.exports = ProductController;
