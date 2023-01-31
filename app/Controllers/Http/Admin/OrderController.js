"use strict";

const Database = use("Database");
const sqlString = require("sqlstring");

class OrderController {
  async index({ view, response, request }) {
    try {
      // let title = post.title;
      // let sku = post.sku;
      // let material = post.material;
      // let description = post.description;
      // let qty = post.qty;
      // let size = post.size;

      let allOrders = await Database.raw(`
       SELECT orders.id, concat(orders.f_name, " ",orders.l_name)
        as customer, SUM(items.qty) as total_items,
        SUM(items.price * items.qty) as total_price, 
        concat(orders.state," ",orders.country) as location, 
        orders.payment_type,
        concat(users.f_name, "",users.l_name) as created_by
        FROM orders
        INNER JOIN items
        ON orders.id = items.order_id
        INNER JOIN users
        ON orders.user_id = users.id
        GROUP BY orders.id;
        `);
      allOrders = allOrders[0];

      return view.render("admin/orders/all", { allOrders });
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
      await Database.raw(
        `
   INSERT INTO orders (
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
    ${parseInt(brand_id)},
    ${parseInt(qty)},
    ${sqlString.escape(size)},
    ${parseInt(1)}
  )
    `
      );

      return response.redirect("/admin/orders");
    } catch (error) {
      return response.redirect("back");
    }
  }
  async create({ view, response, request }) {
    try {
      //   let brands = await Database.raw(`
      //   SELECT * FROM brands
      //   ORDER BY brands.title ASC
      //   `);
      let brands = "";
      return view.render("admin/orders/create", { brands });
    } catch (error) {
      console.log(error);
      return response.redirect("back");
    }
  }
  async show({ view, response, request, params }) {
    try {
      // let order = await Database.raw(`
      // SELECT orders.id, orders.title,orders.sku,orders.img_url, orders.description,
      // brands.title as brand, concat(users.f_name, " ", users.l_name )as user,
      // orders.material,orders.qty,orders.size, orders.user_id,
      // orders.created_at
      // FROM orders
      // INNER JOIN brands
      // ON orders.brand_id = brands.id
      // INNER JOIN users
      // ON orders.user_id = users.id
      // WHERE orders.id = ${params.id}
      // ORDER BY created_at ASC
      // LIMIT 1
      // `);
      // order = order[0][0];

      let order = "";
      return view.render("admin/orders/show", { order });
    } catch (error) {
      console.log(error);
      return response.redirect("back");
    }
  }
  async edit({ view, response, request, params }) {
    try {
      let order = await Database.raw(`
      SELECT orders.id, orders.title,orders.sku,orders.img_url, orders.description,
      brands.title as brand, concat(users.f_name, " ", users.l_name )as user,
      orders.material,orders.qty,orders.size, orders.user_id,orders.brand_id,
      orders.created_at
      FROM orders
      INNER JOIN brands
      ON orders.brand_id = brands.id
      INNER JOIN users
      ON orders.user_id = users.id
      WHERE orders.id = ${params.id}
      ORDER BY created_at ASC
      LIMIT 1
      `);

      order = order[0][0];

      let brands = await Database.raw(`
      SELECT * FROM brands
      ORDER BY brands.title ASC
      `);
      brands = brands[0];

      return view.render("admin/orders/edit", { order, brands });
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
      let brand_id = post.brand_id;
      let img_url = post.img_url;
      await Database.raw(
        `
   UPDATE orders
   SET
   title = ${sqlString.escape(title)},
   sku = ${sqlString.escape(sku)},
   img_url = ${sqlString.escape(img_url)},
   material = ${sqlString.escape(material)},
   description = ${sqlString.escape(description)},
   brand_id = ${parseInt(brand_id)},
   qty = ${parseInt(qty)},
   size = ${sqlString.escape(size)},
   user_id = ${parseInt(1)} 
   WHERE id = ${id}
   `
      );

      return response.redirect(`/admin/orders/${id}`);
    } catch (error) {
      return response.redirect("back");
    }
  }
  async delete({ response, request, params }) {
    try {
      const id = params.id;
      await Database.raw(
        `
        DELETE FROM orders
      WHERE id = ${id}
   `
      );

      return response.redirect(`/admin/orders`);
    } catch (error) {
      return response.redirect("back");
    }
  }
}

module.exports = OrderController;
