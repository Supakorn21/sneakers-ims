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

      // insert information to order table
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
      // return order_id;
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
      let order = await Database.raw(`
          SELECT orders.*, concat(users.f_name, ' ',users.l_name) as user 
          FROM orders
          INNER JOIN users
          ON orders.user_id = users.id
          WHERE orders.id = ${params.id}
      `);

      let items = await Database.raw(`
          SELECT * FROM items
          INNER JOIN products
          ON items.title = products.title
          WHERE order_id = ${params.id}
      `);

      let total_price = await Database.raw(`
          SELECT orders.id,
          SUM(items.qty) as total_items,
          SUM(items.qty * items.price) as total_price
          FROM orders
          INNER JOIN items
          ON orders.id = items.order_id
          WHERE orders.id = ${params.id}
          GROUP BY orders.id;
      `);

      order = order[0][0];
      items = items[0];
      total_price = total_price[0][0].total_price;
      // return total;
      let itemsInfo = {
        items: items,
      };
      let orderInfo = {
        order,
        items,
        total_price,
      };
      // return orderInfo;

      // let order = "";
      return view.render("admin/orders/show", { orderInfo });
    } catch (error) {
      console.log(error);
      return response.redirect("back");
    }
  }
  async edit({ view, response, request, params }) {
    try {
      let order = await Database.raw(`
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
        WHERE orders.id = ${params.id}
        GROUP BY orders.id;
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
      var id = post.id;
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
      let deleteItemsId = post.deleteItemsId;

      //  let firstObject = await post.allItems[0];
      //  let order_id = firstObject.product.order_id;

      let allItemsDatabase = await Database.raw(`
        SELECT * FROM items
        WHERE order_id = ${id}
      `);
      allItemsDatabase = allItemsDatabase[0];

      // function delete product if allItems less than items in Database
      await deleteItemsId.map(async (allItems) => {
        await allItemsDatabase.map(async (allItemDatabase) => {
          let allDeleteItemsId = allItems.id;
          let allItemDatabaseId = allItemDatabase.id;
          if (
            post.allItems.length < allItemDatabase.length ||
            allDeleteItemsId == allItemDatabaseId
          ) {
            try {
              let allItemsToBeDelete = await Promise.all(
                deleteItemsId.map(async (item) => {
                  let selectedDeleteItems = await Database.raw(`
              SELECT * FROM items
              WHERE id = ${item.id}
              `);
                  selectedDeleteItems = selectedDeleteItems[0];

                  return selectedDeleteItems;
                })
              );

              allItemsToBeDelete = allItemsToBeDelete.flatMap(
                (removeArray) => removeArray
              );

              let updateProduct = await Promise.all(
                allItemsToBeDelete.map(async (item) => {
                  await Database.raw(`
                    UPDATE products
                  SET qty = qty + ${item.qty}
                   WHERE title = '${item.title}';
                `);
                })
              );

              const deleteItem = await Promise.all(
                allItemsToBeDelete.map(async (item) => {
                  await Database.raw(
                    `
                      DELETE FROM items
                    WHERE items.id = ${item.id}
                `
                  );
                })
              );

              return updateProduct, deleteItem;
            } catch (err) {
              console.log(err);
            }
          }
        });
      });

      // function update form and insert product
      await post.allItems.map(async (item) => {
        if (item.product.hasOwnProperty("order_id")) {
          try {
            const updateOrder = await Database.raw(
              `
              UPDATE orders
              SET
              f_name = ${sqlString.escape(f_name)},
              l_name = ${sqlString.escape(l_name)},
              address = ${sqlString.escape(address)},
              address_2 =  ${sqlString.escape(address_2)},
              city =  ${sqlString.escape(city)},
              state = ${sqlString.escape(state)},
              zipcode =  ${sqlString.escape(zipcode)},
              country = ${sqlString.escape(country)},
              payment_type =  ${sqlString.escape(payment_type)},
              user_id = ${parseInt(1)}
              WHERE id = ${sqlString.escape(id)}
              ;
            `
            );
            return updateOrder;
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            let insertItem = await Database.raw(
              `
           INSERT INTO items (title,sku, price, material, description, brand_id, qty,
            size, order_id, user_id
          )
        VALUES (
            ${sqlString.escape(item.product.title)},
            ${sqlString.escape(item.product.sku)},
            ${sqlString.escape(item.product.price)},
            ${sqlString.escape(item.product.material)},
            ${sqlString.escape(item.product.description)},
            ${sqlString.escape(item.product.brand_id)},
            ${sqlString.escape(item.qty)},
            ${sqlString.escape(item.product.size)},
            ${id},
            ${parseInt(1)}
          );
            `
            );
            const updateProduct = await Database.raw(`
                  UPDATE products
                    SET qty = qty- ${item.qty}
                  WHERE id = ${item.product.id};
                   `);
            return insertItem, updateProduct;
          } catch (error) {
            console.log(error);

            return;
          }
        }
      });

      // console.log(post.allItems);

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
  async delete({ response, request, params }) {
    try {
      const order_id = params.id;
      await Database.raw(
        `
        DELETE FROM items
      WHERE items.order_id = ${order_id}
   `
      );
      await Database.raw(
        `
        DELETE FROM orders
         WHERE orders.id = ${order_id}
   `
      );

      return response.redirect(`/admin/orders`);
    } catch (error) {
      return response.redirect("back");
    }
  }

  async sendAllOrders({ view, response, request }) {
    try {
      let allOrders = await Database.raw(`
       SELECT * FROM orders
        `);
      allOrders = allOrders[0];

      return allOrders;
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async sendAllItems({ view, response, request }) {
    try {
      let allItems = await Database.raw(`
       SELECT * FROM items
        `);
      allItems = allItems[0];

      return allItems;
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async sendAllProducts({ view, response, request }) {
    try {
      let allProducts = await Database.raw(`
       SELECT * FROM products
        `);
      allProducts = allProducts[0];

      return allProducts;
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
}

module.exports = OrderController;
