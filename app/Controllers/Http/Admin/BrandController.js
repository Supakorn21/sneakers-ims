"use strict";

const Database = use("Database");
const sqlString = require("sqlstring");

class BrandController {
  async index({ view, response, request }) {
    try {
      // let title = post.title;
      // let sku = post.sku;
      // let material = post.material;
      // let description = post.description;
      // let qty = post.qty;
      // let size = post.size;

      let allBrands = await Database.raw(`
            SELECT
            brands.id,
            brands.title,
            brands.img_url,
            brands.user_id,
            concat(users.f_name,' ', users.l_name) as user,
            brands.created_at,
            brands.updated_at
            FROM
            brands
            INNER JOIN users ON brands.user_id = users.id
            ORDER BY
            brands.title ASC
      `);
      allBrands = allBrands[0];

      return view.render("admin/brands/all", { allBrands });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async store({ view, response, request }) {
    try {
      const post = request.post();
      let title = post.title;
      let description = post.description;
      let img_url = post.img_url;
      await Database.raw(
        `
   INSERT INTO brands (
    title,
    img_url,
    description,
    user_id
  )
VALUES (
    ${sqlString.escape(title)},
    ${sqlString.escape(img_url)},
    ${sqlString.escape(description)},
    ${parseInt(1)}
  )
    `
      );

      return response.redirect("/admin/brands");
    } catch (error) {
      return response.redirect("back");
    }
  }
  create({ view, response, request }) {
    return view.render("admin/brands/create");
  }
  async show({ view, response, request, params }) {
    try {
      let brand = await Database.raw(`
      SELECT brands.id, brands.title,brands.img_url, brands.description,
       concat(users.f_name, " ", users.l_name ) as user,
      brands.user_id,brands.created_at,brands.updated_at
      FROM brands
      INNER JOIN users
      ON brands.user_id = users.id
      WHERE brands.id = ${params.id}
      LIMIT 1
      `);
      brand = brand[0][0];

      return view.render("admin/brands/show", { brand });
    } catch (error) {
      console.log(error);
      // return response.redirect("back");
    }
  }
  async edit({ view, response, request, params }) {
    try {
      let brand = await Database.raw(`
      SELECT brands.id, brands.title,brands.img_url, brands.description,
       concat(users.f_name, " ", users.l_name )as user,
      brands.user_id,brands.created_at,brands.updated_at
      FROM brands
      INNER JOIN users
      ON brands.user_id = users.id
      WHERE brands.id = ${params.id}
      ORDER BY created_at ASC
      LIMIT 1
      `);

      brand = brand[0][0];

      return view.render("admin/brands/edit", { brand });
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
      let description = post.description;
      let img_url = post.img_url;
      await Database.raw(
        `
   UPDATE brands
   SET
   title = ${sqlString.escape(title)},
   img_url = ${sqlString.escape(img_url)},
   description = ${sqlString.escape(description)}
   WHERE id = ${id}
   `
      );

      return response.redirect(`/admin/brands/${id}`);
    } catch (error) {
      return response.redirect("back");
    }
  }
  async delete({ response, request, params }) {
    try {
      const id = params.id;
      await Database.raw(
        `
        DELETE FROM brands
        WHERE id = ${id}
   `
      );

      return response.redirect(`/admin/brands`);
    } catch (error) {
      return response.redirect("back");
    }
  }
}

module.exports = BrandController;
