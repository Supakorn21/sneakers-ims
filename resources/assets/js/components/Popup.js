import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "react-addons-update";
var UsaStates = require("usa-states").UsaStates;
const countries = require("country-list");

export default class Popup extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        product: "nike",
        productQty: 0,
        qty: "1",
      },
    };
  }

  change = (e) => {
    let name = e.target.name;
    let value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
    let currentState = this.state;
    let newState = "";
    if (name == "product" && value != "none") {
      let productQty = this.props.allProducts.filter(
        (item) => item.id == value
      );
      productQty = productQty[0].qty;
      console.log(productQty);
      newState = update(
        currentState,
        {
          form: {
            $merge: {
              [name]: value,
              productQty: productQty,
            },
          },
        },
        () => console.log(this.state)
      );
    } else {
      newState = update(currentState, {
        form: {
          $merge: {
            [name]: value,
          },
        },
      });
    }
    this.setState(newState, () => console.log(this.state));
  };

  showProducts = () => {
    if (this.props.allProducts !== "") {
      return this.props.allProducts.map((item, index) => (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      ));
    }
  };

  showQty = () => {
    let options = [];
    let number = 0;
    if (this.state.form.productQty > 10) {
      number = 10;
    } else {
      number = this.state.form.productQty;
    }

    if (
      this.state.form.productQty !== 0 ||
      this.state.form.productQty != "none"
    ) {
      for (let i = 1; i <= number; i++) {
        options.push(i);
      }

      return options.map((i) => (
        <option key={i} value={`${i}`}>
          {i}
        </option>
      ));
    } else {
      return (
        <option key={`no value`} value={`none`}>
          Please choose a product that's available
        </option>
      );
    }
  };

  clickedSaveItemBtn = () => {
    let product = this.props.allProducts.filter(
      (product) => product.id == this.state.form.product
    );
    product = product[0];
    let itemData = {
      productInfo: product,
      qtyBuying: this.state.form.qty,
    };
    this.props.addItemToList(itemData);
    this.props.closePopup();
  };

  clickedcancelBtn = () => {
    this.props.closePopup();
  };

  async test() {}

  render() {
    return (
      <div className={`popup ${this.props.showPopup ? "active" : ""} `}>
        <div className="container-box">
          <div className="row">
            <div className="col-md-12">
              <h2>Add Item to Order</h2>
              <div className="form-group">
                <label htmlFor="">Product</label>
                <select
                  className="form-control"
                  value={this.state.form.product}
                  onChange={this.change}
                  name="product"
                >
                  <option value="none">Select A Sneaker</option>
                  {this.showProducts()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Quantity</label>
                <select
                  className="form-control"
                  value={this.state.form.qty}
                  onChange={this.change}
                  name="qty"
                >
                  {this.showQty()}
                </select>
              </div>
              <div
                className="add-btn btn btn-primary mb-3"
                onClick={this.clickedSaveItemBtn}
              >
                Save Item
              </div>
              <div
                className="cancel-btn btn btn-danger mb-3"
                onClick={this.clickedcancelBtn}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
