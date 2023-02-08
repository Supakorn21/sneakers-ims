"use strict";

class DashboardController {
  async index({ view, response, request }) {
    try {
      // let title = post.title;
      // let sku = post.sku;
      // let material = post.material;
      // let description = post.description;
      // let qty = post.qty;
      // let size = post.size;

      //   let allBrands = await Database.raw(`
      //         SELECT
      //         brands.id,
      //         brands.title,
      //         brands.img_url,
      //         brands.user_id,
      //         concat(users.f_name,' ', users.l_name) as user,
      //         brands.created_at,
      //         brands.updated_at
      //         FROM
      //         brands
      //         INNER JOIN users ON brands.user_id = users.id
      //         ORDER BY
      //         brands.title ASC
      //   `);
      //   allBrands = allBrands[0];
      let allBrands = "";

      return view.render("admin/dashboard/index", { allBrands });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
}

module.exports = DashboardController;
