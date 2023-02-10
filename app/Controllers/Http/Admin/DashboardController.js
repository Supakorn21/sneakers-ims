"use strict";

const Database = use("Database");
const sqlString = require("sqlstring");

class DashboardController {
  async index({ view, response, request }) {
    try {
      let data = {
        topSalesMothly: {
          months: [],
          total_items: [],
          total_earned: [],
        },
      };
      let getMonthsSales = await Database.raw(`
          SELECT
          MONTHNAME(MIN(orders.created_at)) as month,
          SUM(items.qty) as total_items,
          SUM(items.price * items.qty) as total_price
        FROM
        orders
          INNER JOIN items ON orders.id = items.order_id
        WHERE
          YEAR (orders.created_at) = YEAR(CURDATE())
        GROUP BY
          MONTH (orders.created_at);
        `);
      getMonthsSales = getMonthsSales[0];

      getMonthsSales.map((item) => {
        data.topSalesMothly.months.push(item.month);
        data.topSalesMothly.total_items.push(item.total_items);
        data.topSalesMothly.total_earned.push(item.total_price);
      });

      return view.render("admin/dashboard/index", { data });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
}

module.exports = DashboardController;
