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
        qty: "1",
      },
    };
  }

  change = (e) => {
    let name = e.target.name;
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentState = this.state;
    let newState = update(currentState, {
      form: {
        $merge: {
          [name]: value,
        },
      },
    });

    this.setState(newState, () => {
      console.log(this.state.form);
    });
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
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
