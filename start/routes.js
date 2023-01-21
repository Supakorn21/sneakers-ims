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

Route.get("/admin/products", "Admin/ProductController.index");
Route.post("/admin/products", "Admin/ProductController.store");
Route.get("/admin/products/create", "Admin/ProductController.create");
Route.get("/admin/products/:id", "Admin/ProductController.show");
Route.get("/admin/products/:id/edit", "Admin/ProductController.edit");
Route.put("/admin/products/:id/edit", "Admin/ProductController.update");
Route.get("/admin/products/:id/delete", "Admin/ProductController.delete");
