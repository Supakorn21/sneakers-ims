"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Admin/Products
Route.get("/admin/products", "Admin/ProductController.index");
Route.post("/admin/products", "Admin/ProductController.store");
Route.get("/admin/products/create", "Admin/ProductController.create");
Route.get("/admin/products/:id", "Admin/ProductController.show");
Route.get("/admin/products/:id/edit", "Admin/ProductController.edit");
Route.put("/admin/products/:id", "Admin/ProductController.update");
Route.get("/admin/products/:id/delete", "Admin/ProductController.delete");

// Admin/Brands
Route.get("/admin/brands", "Admin/BrandController.index");
Route.post("/admin/brands", "Admin/BrandController.store");
Route.get("/admin/brands/create", "Admin/BrandController.create");
Route.get("/admin/brands/:id", "Admin/BrandController.show");
Route.get("/admin/brands/:id/edit", "Admin/BrandController.edit");
Route.put("/admin/brands/:id", "Admin/BrandController.update");
Route.get("/admin/brands/:id/delete", "Admin/BrandController.delete");
