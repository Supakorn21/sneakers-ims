webpackJsonp([0],{

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(47);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(48);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsUpdate = __webpack_require__(71);

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsaStates = __webpack_require__(72).UsaStates;
var countries = __webpack_require__(70);

var editPopup = function (_Component) {
  _inherits(editPopup, _Component);

  function editPopup() {
    _classCallCheck(this, editPopup);

    var _this = _possibleConstructorReturn(this, (editPopup.__proto__ || Object.getPrototypeOf(editPopup)).call(this));

    _this.change = function (e) {
      var name = e.target.name;
      var value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
      var currentState = _this.state;
      var newState = "";
      if (name == "product" && value != "none") {
        var _$merge;

        var productQty = _this.props.allProducts.filter(function (item) {
          return item.id == value;
        });
        productQty = productQty[0].qty;
        console.log(productQty);
        newState = (0, _reactAddonsUpdate2.default)(currentState, {
          form: {
            $merge: (_$merge = {}, _defineProperty(_$merge, name, value), _defineProperty(_$merge, "productQty", productQty), _$merge)
          }
        }, function () {
          return console.log(_this.state);
        });
      } else {
        newState = (0, _reactAddonsUpdate2.default)(currentState, {
          form: {
            $merge: _defineProperty({}, name, value)
          }
        });
      }
      _this.setState(newState, function () {
        return console.log(_this.state);
      });
    };

    _this.showProducts = function () {
      if (_this.props.allProducts !== "") {
        return _this.props.allProducts.map(function (item, index) {
          return _react2.default.createElement(
            "option",
            { key: item.id, value: item.id },
            item.title
          );
        });
      }
    };

    _this.showQty = function () {
      var options = [];
      var number = 0;
      if (_this.state.form.productQty > 10) {
        number = 10;
      } else {
        number = _this.state.form.productQty;
      }

      if (_this.state.form.productQty !== 0 || _this.state.form.productQty != "none") {
        for (var i = 1; i <= number; i++) {
          options.push(i);
        }

        return options.map(function (i) {
          return _react2.default.createElement(
            "option",
            { key: i, value: "" + i },
            i
          );
        });
      } else {
        return _react2.default.createElement(
          "option",
          { key: "no value", value: "none" },
          "Please choose a product that's available"
        );
      }
    };

    _this.clickedSaveItemBtn = function () {
      var product = _this.props.allProducts.filter(function (product) {
        return product.id == _this.state.form.product;
      });
      product = product[0];
      console.log(product);
      var itemData = {
        product: product,
        qty: _this.state.form.qty
      };
      _this.props.addItemToList(itemData);
      _this.props.closePopup();
    };

    _this.clickedcancelBtn = function () {
      _this.props.closePopup();
    };

    _this.state = {
      form: {
        product: "nike",
        productQty: 0,
        qty: "1"
      }
    };
    return _this;
  }

  _createClass(editPopup, [{
    key: "test",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function test() {
        return _ref.apply(this, arguments);
      }

      return test;
    }()
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "popup " + (this.props.showPopup ? "active" : "") + " " },
        _react2.default.createElement(
          "div",
          { className: "container-box" },
          _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(
              "div",
              { className: "col-md-12" },
              _react2.default.createElement(
                "h2",
                null,
                "Add Item to Order"
              ),
              _react2.default.createElement(
                "div",
                { className: "form-group" },
                _react2.default.createElement(
                  "label",
                  { htmlFor: "" },
                  "Product"
                ),
                _react2.default.createElement(
                  "select",
                  {
                    className: "form-control",
                    value: this.state.form.product,
                    onChange: this.change,
                    name: "product"
                  },
                  _react2.default.createElement(
                    "option",
                    { value: "none" },
                    "Select A Sneaker"
                  ),
                  this.showProducts()
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "form-group" },
                _react2.default.createElement(
                  "label",
                  { htmlFor: "" },
                  "Quantity"
                ),
                _react2.default.createElement(
                  "select",
                  {
                    className: "form-control",
                    value: this.state.form.qty,
                    onChange: this.change,
                    name: "qty"
                  },
                  this.showQty()
                )
              ),
              _react2.default.createElement(
                "div",
                {
                  className: "add-btn btn btn-primary mb-3",
                  onClick: this.clickedSaveItemBtn
                },
                "Save Item"
              ),
              _react2.default.createElement(
                "div",
                {
                  className: "cancel-btn btn btn-danger mb-3",
                  onClick: this.clickedcancelBtn
                },
                "Cancel"
              )
            )
          )
        )
      );
    }
  }]);

  return editPopup;
}(_react.Component);

exports.default = editPopup;

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(47);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(48);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsUpdate = __webpack_require__(71);

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _editPopup = __webpack_require__(243);

var _editPopup2 = _interopRequireDefault(_editPopup);

var _axios = __webpack_require__(105);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsaStates = __webpack_require__(72).UsaStates;
var countries = __webpack_require__(70);

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    var _this2 = this;

    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

    _this.getEditData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var url, url_array, id, form, allItems, editAllProductsData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, first, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, second, allProducts;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              url = window.location.pathname;
              url_array = url.split("/");
              id = url_array[3];
              _context.next = 6;
              return _axios2.default.get("/api/admin/orders");

            case 6:
              form = _context.sent;

              form = form.data;
              // console.log(form);
              form = form.filter(function (object) {
                return object.id == id;
              });
              form = form[0];

              _context.next = 12;
              return _axios2.default.get("/api/admin/items");

            case 12:
              allItems = _context.sent;

              allItems = allItems.data;
              allItems = allItems.filter(function (object) {
                return object.order_id == id;
              });
              allItems = allItems.map(function (item) {
                return {
                  product: item,
                  qty: "" + item.qty
                };
              });

              console.log(allItems);

              _context.next = 19;
              return _axios2.default.get("/api/admin/products");

            case 19:
              editAllProductsData = _context.sent;

              editAllProductsData = editAllProductsData.data;
              // console.log(editAllProductsData);
              editAllProductsData = editAllProductsData.filter(function (_ref2) {
                var id1 = _ref2.title;
                return allItems.some(function (_ref3) {
                  var id2 = _ref3.product;
                  return id2.title === id1;
                });
              });
              editAllProductsData = editAllProductsData.map(function (itemEdit) {
                return {
                  title: itemEdit.title,
                  img_url: itemEdit.img_url
                };
              });

              // push img_url into allproduct array
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 26;
              _iterator = allItems[Symbol.iterator]();

            case 28:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 60;
                break;
              }

              first = _step.value;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 33;
              _iterator2 = editAllProductsData[Symbol.iterator]();

            case 35:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 43;
                break;
              }

              second = _step2.value;

              if (!(first.product.title === second.title)) {
                _context.next = 40;
                break;
              }

              first.product.img_url = second.img_url;
              return _context.abrupt("break", 43);

            case 40:
              _iteratorNormalCompletion2 = true;
              _context.next = 35;
              break;

            case 43:
              _context.next = 49;
              break;

            case 45:
              _context.prev = 45;
              _context.t0 = _context["catch"](33);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 49:
              _context.prev = 49;
              _context.prev = 50;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 52:
              _context.prev = 52;

              if (!_didIteratorError2) {
                _context.next = 55;
                break;
              }

              throw _iteratorError2;

            case 55:
              return _context.finish(52);

            case 56:
              return _context.finish(49);

            case 57:
              _iteratorNormalCompletion = true;
              _context.next = 28;
              break;

            case 60:
              _context.next = 66;
              break;

            case 62:
              _context.prev = 62;
              _context.t1 = _context["catch"](26);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 66:
              _context.prev = 66;
              _context.prev = 67;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 69:
              _context.prev = 69;

              if (!_didIteratorError) {
                _context.next = 72;
                break;
              }

              throw _iteratorError;

            case 72:
              return _context.finish(69);

            case 73:
              return _context.finish(66);

            case 74:
              _context.next = 76;
              return _axios2.default.get("/api/admin/products");

            case 76:
              allProducts = _context.sent;

              allProducts = allProducts.data;
              // console.log(allProducts);

              _this.setState({
                form: form,
                allItems: allItems,
                allProducts: allProducts
              }, function () {
                return console.log(_this.state);
              });
              _context.next = 84;
              break;

            case 81:
              _context.prev = 81;
              _context.t2 = _context["catch"](0);

              console.log(_context.t2);

            case 84:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 81], [26, 62, 66, 74], [33, 45, 49, 57], [50,, 52, 56], [67,, 69, 73]]);
    }));

    _this.addItemToList = function (item) {
      var allItems = _this.state.allItems;
      var oldState = _this.state;
      var newState = (0, _reactAddonsUpdate2.default)(oldState, {
        allItems: { $push: [item] }
      });
      _this.setState(newState, function () {
        console.log("New state");
        console.log(_this.state);
      });
    };

    _this.getAllProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var allProducts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _axios2.default.get("/api/admin/products");

            case 3:
              allProducts = _context2.sent;

              allProducts = allProducts.data;
              console.log(allProducts);
              _this.setState({
                allProducts: allProducts
              }, function () {
                return console.log(_this.state);
              });
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);

              console.log(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 9]]);
    }));

    _this.removeItem = function (id, index) {
      var oldState = _this.state;
      var itemIndex = _this.state.allItems.findIndex(function (item) {
        return item.product.id === id;
      });

      var newState = (0, _reactAddonsUpdate2.default)(oldState, {
        allItems: {
          $splice: [[itemIndex, 1]]
        },
        deleteItemsId: {
          $push: [{ id: id }]
        }
      });
      // if (itemIndex !== -1) {
      //   newState.allItems.splice(itemIndex, 1);
      // }

      _this.setState(newState, function () {
        return console.log(_this.state);
      });
    };

    _this.showAllItems = function () {
      // Prevent the error that notify the same item already existed function
      var randomKey = function randomKey() {
        var randomNumber = "_" + Math.random().toString(36).substring(2, 9);
        randomNumber += 3;
        return randomNumber;
      };

      return _this.state.allItems.map(function (item, index) {
        return _react2.default.createElement(
          "div",
          { className: "col-md-3", key: randomKey() },
          _react2.default.createElement(
            "div",
            { className: "item-box" },
            _react2.default.createElement(
              "div",
              {
                className: "item-img",
                style: {
                  background: "url('" + item.product.img_url + "')"
                }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "item-delete",
                  onClick: _this.removeItem.bind(null, item.product.id, index)
                },
                _react2.default.createElement("i", { className: "ti-close" })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "title" },
              item.product.title
            ),
            _react2.default.createElement(
              "div",
              { className: "quantity" },
              _react2.default.createElement(
                "label",
                { className: "col-form-label" },
                "Quantity"
              ),
              _react2.default.createElement(
                "h4",
                null,
                item.qty
              )
            )
          )
        );
      });
    };

    _this.change = function (e) {
      var name = e.target.name;
      var value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      var currentState = _this.state;
      var newState = (0, _reactAddonsUpdate2.default)(currentState, {
        form: {
          $merge: _defineProperty({}, name, value)
        }
      });

      _this.setState(newState, function () {
        console.log(_this.state.form);
      });
    };

    _this.showStates = function () {
      var usStates = new UsaStates();

      return usStates.states.map(function (item, index) {
        return _react2.default.createElement(
          "option",
          { key: index, value: item.abbreviation },
          item.name
        );
      });
    };

    _this.showCountries = function () {
      var allCountries = countries.getData();

      return allCountries.map(function (item) {
        return _react2.default.createElement(
          "option",
          { key: item.code, value: item.code },
          item.name
        );
      });
    };

    _this.addNewBtn = function () {
      _this.setState({
        showPopup: !_this.state.showPopup
      });
    };

    _this.submitForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var url, url_array, id, self, csrf, submit;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = window.location.pathname;
              url_array = url.split("/");
              id = url_array[3];
              self = window;
              _context3.prev = 4;
              csrf = document.getElementsByName("_csrf")[0].value;
              _context3.next = 8;
              return _axios2.default.post("/api/admin/orders", {
                _csrf: csrf,
                form: _this.state.form,
                allItems: _this.state.allItems,
                id: id,
                deleteItemsId: _this.state.deleteItemsId
              });

            case 8:
              submit = _context3.sent;


              // checking if data is success then redirect to /admin/orders page
              if (submit.data.status === "success") {
                console.log("success================");
                console.log(submit.data);
                console.log("success================");
                self.location.href = "/admin/orders/" + id + "/edit";
              } else {
                alert("\n          Status: " + submit.data.status + " \n\n          Message: " + submit.data.message + " \n\n          Error: " + submit.data.error + " \n\n          ");
              }
              console.log(submit);
              _context3.next = 18;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](4);

              console.log("====ERROR SUBMITTING FORM========");
              console.log(_context3.t0);
              console.log("====ERROR========");

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[4, 13]]);
    }));

    _this.state = {
      form: {
        f_name: "",
        l_name: "",
        address: "",
        address_2: "",
        city: "",
        state: "NY",
        country: "US",
        payment_type: "paypal",
        zipcode: ""
      },
      showPopup: false,
      allProducts: [],
      allItems: [],
      editItemData: [],
      editAllProductsData: [],
      deleteItemsId: []
    };
    return _this;
  }

  _createClass(Layout, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getEditData();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "form",
        { action: "/admin/products", method: "post" },
        _react2.default.createElement(
          "div",
          { className: "row form-group" },
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { htmlFor: "example-text-input", className: "col-form-label" },
              "First Name"
            ),
            _react2.default.createElement("input", {
              name: "f_name",
              className: "form-control",
              type: "text",
              value: this.state.form.f_name,
              onChange: this.change,
              id: "example-text-input"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { htmlFor: "example-text-input", className: "col-form-label" },
              "Last Name"
            ),
            _react2.default.createElement("input", {
              name: "l_name",
              className: "form-control",
              type: "text",
              value: this.state.form.l_name,
              onChange: this.change,
              id: "example-text-input"
            })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "form-group row" },
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { htmlFor: "example-text-input", className: "col-form-label" },
              "Address"
            ),
            _react2.default.createElement("input", {
              name: "address",
              className: "form-control",
              type: "text",
              value: this.state.form.address,
              onChange: this.change,
              id: "example-text-input"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { htmlFor: "example-text-input", className: "col-form-label" },
              "Address 2"
            ),
            _react2.default.createElement("input", {
              name: "address_2",
              className: "form-control",
              type: "text",
              value: this.state.form.address_2,
              onChange: this.change,
              id: "example-text-input"
            })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "form-group row" },
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-3" },
            _react2.default.createElement(
              "label",
              { htmlFor: "example-text-input", className: "col-form-label" },
              "City"
            ),
            _react2.default.createElement("input", {
              name: "city",
              className: "form-control",
              type: "text",
              value: this.state.form.city,
              onChange: this.change,
              id: "example-text-input"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-3" },
            _react2.default.createElement(
              "label",
              { htmlFor: "example-text-input", className: "col-form-label" },
              "State"
            ),
            _react2.default.createElement(
              "select",
              {
                name: "state",
                className: "form-control",
                value: this.state.form.state,
                onChange: this.change
              },
              this.showStates()
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { className: "col-form-label" },
              "Country"
            ),
            _react2.default.createElement(
              "select",
              {
                className: "form-control",
                value: this.state.form.country,
                onChange: this.change,
                name: "country"
              },
              this.showCountries()
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "form-group row" },
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { className: "col-form-label" },
              "Zipcode"
            ),
            _react2.default.createElement("input", {
              name: "zipcode",
              className: "form-control",
              type: "text",
              value: this.state.form.zipcode,
              onChange: this.change,
              id: "example-text-input"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-12 col-md-6" },
            _react2.default.createElement(
              "label",
              { className: "col-form-label" },
              "Payment Type"
            ),
            _react2.default.createElement(
              "select",
              {
                className: "form-control",
                value: this.state.form.payment_type,
                onChange: this.change,
                name: "payment_type"
              },
              _react2.default.createElement(
                "option",
                { value: "paypal" },
                "Paypal"
              ),
              _react2.default.createElement(
                "option",
                { value: "credit_card" },
                "Credit Card"
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "row order-items" },
          _react2.default.createElement(
            "div",
            { className: "col-md-12" },
            _react2.default.createElement(
              "h2",
              null,
              "Order Items"
            )
          ),
          this.showAllItems(),
          _react2.default.createElement(
            "div",
            { className: "col-md-3" },
            _react2.default.createElement(
              "div",
              { className: "item-box" },
              _react2.default.createElement(
                "div",
                { onClick: this.addNewBtn, className: "add-item-button" },
                _react2.default.createElement(
                  "span",
                  null,
                  "+"
                ),
                "Add New Item"
              )
            )
          ),
          _react2.default.createElement(_editPopup2.default, {
            showPopup: this.state.showPopup,
            closePopup: this.addNewBtn,
            allProducts: this.state.allProducts,
            addItemToList: this.addItemToList
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "form-group" },
          _react2.default.createElement(
            "div",
            { onClick: this.submitForm, className: "btn btn-primary mb-3" },
            "Submit"
          )
        )
      );
    }
  }]);

  return Layout;
}(_react.Component);

var editOrdersForm = document.getElementById("editOrdersForm");

_reactDom2.default.render(_react2.default.createElement(Layout, null), editOrdersForm);

/***/ })

},[265]);