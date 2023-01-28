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
      allProducts: "",
    };
  }

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
          allProducts: allProducts,
        },
        () => console.log(this.state)
      );
    } catch (error) {
      console.log(error);
    }
    // .then(function (response) {
    //   // handle success
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // .finally(function () {
    //   // always executed
    // });
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
          <div className="col-md-3">
            <div className="item-box">
              <div
                className="item-img"
                style={{
                  background:
                    "url('https://cdn-images.farfetch-contents.com/17/35/40/49/17354049_36243389_480.jpg')",
                }}
              >
                <div className="item-delete">
                  <i className="ti-close"></i>
                </div>
              </div>
              <div className="title">Sneaker Title</div>
              <div className="quantity">
                <label className="col-form-label">Quantity</label>
                <h4>4</h4>
              </div>
            </div>
          </div>
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
          />
        </div>
        <div className="form-group">
          <button type="sybmit" className="btn btn-primary mb-3">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const ordersForm = document.getElementById("ordersForm");

ReactDOM.render(<Layout />, ordersForm);
