webpackJsonp(
  [0],
  {
    /***/ 235: /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();

      var _react = __webpack_require__(99);

      var _react2 = _interopRequireDefault(_react);

      var _reactDom = __webpack_require__(100);

      var _reactDom2 = _interopRequireDefault(_reactDom);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }
              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(
                  function (value) {
                    step("next", value);
                  },
                  function (err) {
                    step("throw", err);
                  }
                );
              }
            }
            return step("next");
          });
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Layout = (function (_Component) {
        _inherits(Layout, _Component);

        function Layout() {
          _classCallCheck(this, Layout);

          var _this = _possibleConstructorReturn(
            this,
            (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this)
          );

          _this.clickedBtn = function () {};

          _this.state = {
            name: "Joe",
          };
          return _this;
        }

        _createClass(Layout, [
          {
            key: "test",
            value: (function () {
              var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(
                    function _callee$(_context) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                          case "end":
                            return _context.stop();
                        }
                      }
                    },
                    _callee,
                    this
                  );
                })
              );

              function test() {
                return _ref.apply(this, arguments);
              }

              return test;
            })(),
          },
          {
            key: "render",
            value: function render() {
              return _react2.default.createElement(
                "div",
                { className: "home" },
                _react2.default.createElement(
                  "div",
                  { className: "Aligner" },
                  _react2.default.createElement(
                    "div",
                    { className: "Aligner-item" },
                    _react2.default.createElement("img", {
                      src: "/img/logo.png",
                      alt: "codingphase logo",
                    }),
                    _react2.default.createElement(
                      "h1",
                      null,
                      "Dev-Starter-Kit"
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "menu" },
                      _react2.default.createElement(
                        "ul",
                        null,
                        _react2.default.createElement(
                          "li",
                          null,
                          _react2.default.createElement(
                            "a",
                            {
                              href: "http://starterkit.codingphase.com",
                              target: "new",
                            },
                            "Documentation"
                          )
                        ),
                        _react2.default.createElement(
                          "li",
                          null,
                          _react2.default.createElement(
                            "a",
                            {
                              href: "http://www.codingphase.com",
                              target: "new",
                            },
                            "CodingPhase.Com"
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "version-num" },
                      "version 4.0.0"
                    )
                  )
                )
              );
            },
          },
        ]);

        return Layout;
      })(_react.Component);

      var ordersForm = document.getElementById("ordersForm");

      _reactDom2.default.render(
        _react2.default.createElement(Layout, null),
        ordersForm
      );

      /***/
    },
  },
  [235]
);
