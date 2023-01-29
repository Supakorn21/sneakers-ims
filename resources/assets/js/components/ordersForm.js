import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "react-addons-update";
import Popup from "./Popup";
import axios from "axios";
var UsaStates = require("usa-states").UsaStates;
const countries = require("country-list");

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        f_name: "",
        l_name: "",
        address: "",
        address_2: "",
        city: "",
        state: "NY",
        country: "US",
        payment_type: "paypal",
        zipcode: "",
      },
      showPopup: false,
      allProducts: [],
      allItems: [],
    };
  }

  addItemToList = (item) => {
    let allItems = this.state.allItems;
    let oldState = this.state;
    let newState = update(oldState, {
      allItems: { $push: [item] },
    });
    this.setState(newState, () => {
      console.log("New state");
      console.log(this.state);
    });
  };

  componentWillMount() {
    this.getAllProducts();
  }

  getAllProducts = async () => {
    try {
      let allProducts = await axios.get("/api/admin/products");
      allProducts = allProducts.data;
      console.log(allProducts);
      this.setState(
        {
          allProducts,
        },
        () => console.log(this.state)
      );
    } catch (error) {
      console.log(error);
    }
  };

  removeItem = (index) => {
    let oldState = this.state;
    let newState = update(oldState, {
      allItems: {
        $splice: [[index, 1]],
      },
    });
    this.setState(newState);
  };

  showAllItems = () => {
    return this.state.allItems.map((item, index) => (
      <div className="col-md-3" key={item.productInfo.id}>
        <div className="item-box">
          <div
            className="item-img"
            style={{
              background: `url('${item.productInfo.img_url}')`,
            }}
          >
            <div
              className="item-delete"
              onClick={this.removeItem.bind(null, index)}
            >
              <i className="ti-close"></i>
            </div>
          </div>
          <div className="title">{item.productInfo.title}</div>
          <div className="quantity">
            <label className="col-form-label">Quantity</label>
            <h4>{item.qtyBuying}</h4>
          </div>
        </div>
      </div>
    ));
  };

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

  showStates = () => {
    var usStates = new UsaStates();

    return usStates.states.map((item, index) => (
      <option key={index} value={item.abbreviation}>
        {item.name}
      </option>
    ));
  };

  showCountries = () => {
    var allCountries = countries.getData();

    return allCountries.map((item) => (
      <option key={item.code} value={item.code}>
        {item.name}
      </option>
    ));
  };

  addNewBtn = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  submitForm = async () => {
    try {
      let submit = await axios.post("/api/admin/products", {
        form: this.state.form,
        allItems: this.state.allItems,
      });
      console.log(submit);
    } catch (error) {
      console.log("====ERROR SUBMITTING FORM========");
      console.log(error);
      console.log("====ERROR========");
    }
  };

  async test() {}

  render() {
    return (
      <form action="/admin/products" method="post">
        <div className="row form-group">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">
              First Name
            </label>
            <input
              name="f_name"
              className="form-control"
              type="text"
              value={this.state.form.f_name}
              onChange={this.change}
              id="example-text-input"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">
              Last Name
            </label>
            <input
              name="l_name"
              className="form-control"
              type="text"
              value={this.state.form.l_name}
              onChange={this.change}
              id="example-text-input"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">
              Address
            </label>
            <input
              name="address"
              className="form-control"
              type="text"
              value={this.state.form.address}
              onChange={this.change}
              id="example-text-input"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label htmlFor="example-text-input" className="col-form-label">
              Address 2
            </label>
            <input
              name="address_2"
              className="form-control"
              type="text"
              value={this.state.form.address_2}
              onChange={this.change}
              id="example-text-input"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 col-md-3">
            <label htmlFor="example-text-input" className="col-form-label">
              City
            </label>
            <input
              name="city"
              className="form-control"
              type="text"
              value={this.state.form.city}
              onChange={this.change}
              id="example-text-input"
            />
          </div>
          <div className="col-sm-12 col-md-3">
            <label htmlFor="example-text-input" className="col-form-label">
              State
            </label>
            <select
              name="state"
              className="form-control"
              value={this.state.form.state}
              onChange={this.change}
            >
              {this.showStates()}
            </select>
          </div>

          <div className="col-sm-12 col-md-6">
            <label className="col-form-label">Country</label>
            <select
              className="form-control"
              value={this.state.form.country}
              onChange={this.change}
              name="country"
            >
              {this.showCountries()}
              {/* <option value="Thailand">Country</option> */}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 col-md-6">
            <label className="col-form-label">Zipcode</label>
            <input
              name="zipcode"
              className="form-control"
              type="text"
              value={this.state.form.zipcode}
              onChange={this.change}
              id="example-text-input"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <label className="col-form-label">Payment Type</label>
            <select
              className="form-control"
              value={this.state.form.payment_type}
              onChange={this.change}
              name="payment_type"
            >
              <option value="paypal">Paypal</option>
              <option value="credit_card">Credit Card</option>
            </select>
          </div>
        </div>
        <div className="row order-items">
          <div className="col-md-12">
            <h2>Order Items</h2>
          </div>
          {/* showAllItems function */}
          {this.showAllItems()}

          <div className="col-md-3">
            <div className="item-box">
              <div onClick={this.addNewBtn} className="add-item-button">
                <span>+</span>
                Add New Item
              </div>
            </div>
          </div>
          {/* popup */}
          <Popup
            showPopup={this.state.showPopup}
            closePopup={this.addNewBtn}
            allProducts={this.state.allProducts}
            addItemToList={this.addItemToList}
          />
        </div>
        <div className="form-group">
          <div onClick={this.submitForm} className="btn btn-primary mb-3">
            Submit
          </div>
        </div>
      </form>
    );
  }
}

const ordersForm = document.getElementById("ordersForm");

ReactDOM.render(<Layout />, ordersForm);
