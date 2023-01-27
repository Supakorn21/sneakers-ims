webpackJsonp([0],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(99);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(100);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsUpdate = __webpack_require__(233);

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsaStates = __webpack_require__(235).UsaStates;
var countries = __webpack_require__(232);

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

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

    _this.clickedBtn = function () {};

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
      }
    };
    return _this;
  }

  _createClass(Layout, [{
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
          _react2.default.createElement(
            "div",
            { className: "col-md-3" },
            _react2.default.createElement(
              "div",
              { className: "item-box" },
              _react2.default.createElement(
                "div",
                {
                  className: "item-img",
                  style: {
                    background: "url('https://cdn-images.farfetch-contents.com/17/35/40/49/17354049_36243389_480.jpg')"
                  }
                },
                _react2.default.createElement(
                  "div",
                  { className: "item-delete" },
                  _react2.default.createElement("i", { className: "ti-close" })
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "title" },
                "Sneaker Title"
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
                  "4"
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "col-md-3" },
            _react2.default.createElement(
              "div",
              { className: "item-box" },
              _react2.default.createElement(
                "div",
                { className: "add-item-button" },
                _react2.default.createElement(
                  "span",
                  null,
                  "+"
                ),
                "Add New Item"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "popup" },
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
                      { className: "form-control", name: "product" },
                      _react2.default.createElement(
                        "option",
                        { value: "0" },
                        "title / quantity"
                      )
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
                      { className: "form-control", name: "qty" },
                      _react2.default.createElement(
                        "option",
                        { value: "0" },
                        "1"
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "add-btn btn btn-primary mb-3" },
                    "Save Item"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "cancel-btn btn btn-danger mb-3" },
                    "Cancel"
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "form-group" },
          _react2.default.createElement(
            "button",
            { type: "sybmit", className: "btn btn-primary mb-3" },
            "Submit"
          )
        )
      );
    }
  }]);

  return Layout;
}(_react.Component);

var ordersForm = document.getElementById("ordersForm");

_reactDom2.default.render(_react2.default.createElement(Layout, null), ordersForm);

/***/ })

},[238]);