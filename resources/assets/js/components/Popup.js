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
                  <option value="adidas">adidas</option>
                  <option value="nike">Nike</option>
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
                </select>
              </div>
              <div className="add-btn btn btn-primary mb-3">Save Item</div>
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
