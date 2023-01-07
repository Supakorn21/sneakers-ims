"use strict";

class ProductController {
  index({ view }) {
    return view.render("admin/products/all");
  }
  store() {}
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
