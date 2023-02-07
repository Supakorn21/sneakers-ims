import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "react-addons-update";
import EditPopup from "./editPopup";
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
      editItemData: [],
      editAllProductsData: [],
      deleteItemsId: [],
    };
  }

  getEditData = async () => {
    try {
      var url = window.location.pathname;
      var url_array = url.split("/");
      var id = url_array[3];

      let form = await axios.get("/api/admin/orders");
      form = form.data;
      // console.log(form);
      form = form.filter((object) => object.id == id);
      form = form[0];

      let allItems = await axios.get("/api/admin/items");
      allItems = allItems.data;
      allItems = allItems.filter((object) => object.order_id == id);
      allItems = allItems.map((item) => {
        return {
          product: item,
          qty: `${item.qty}`,
        };
      });

      console.log(allItems);

      let editAllProductsData = await axios.get("/api/admin/products");
      editAllProductsData = editAllProductsData.data;
      // console.log(editAllProductsData);
      editAllProductsData = editAllProductsData.filter(({ title: id1 }) =>
        allItems.some(({ product: id2 }) => id2.title === id1)
      );
      editAllProductsData = editAllProductsData.map((itemEdit) => {
        return {
          title: itemEdit.title,
          img_url: itemEdit.img_url,
        };
      });

      // push img_url into allproduct array
      for (const first of allItems) {
        for (const second of editAllProductsData) {
          if (first.product.title === second.title) {
            first.product.img_url = second.img_url;
            break;
          }
        }
      }

      let allProducts = await axios.get("/api/admin/products");
      allProducts = allProducts.data;
      // console.log(allProducts);

      this.setState(
        {
          form,
          allItems,
          allProducts,
        },
        () => console.log(this.state)
      );
    } catch (error) {
      console.log(error);
    }
  };

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
    this.getEditData();
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

  removeItem = (id, index) => {
    let oldState = this.state;
    let itemIndex = this.state.allItems.findIndex(
      (item) => item.product.id === id
    );

    let newState = update(oldState, {
      allItems: {
        $splice: [[itemIndex, 1]],
      },
      deleteItemsId: {
        $push: [{ id }],
      },
    });
    // if (itemIndex !== -1) {
    //   newState.allItems.splice(itemIndex, 1);
    // }

    this.setState(newState, () => console.log(this.state));
  };

  showAllItems = () => {
    // Prevent the error that notify the same item already existed function
    let randomKey = () => {
      let randomNumber = "_" + Math.random().toString(36).substring(2, 9);
      randomNumber += 3;
      return randomNumber;
    };

    return this.state.allItems.map((item, index) => (
      <div className="col-md-3" key={randomKey()}>
        <div className="item-box">
          <div
            className="item-img"
            style={{
              background: `url('${item.product.img_url}')`,
            }}
          >
            <div
              className="item-delete"
              onClick={this.removeItem.bind(null, item.product.id, index)}
            >
              <i className="ti-close"></i>
            </div>
          </div>
          <div className="title">{item.product.title}</div>
          <div className="quantity">
            <label className="col-form-label">Quantity</label>
            <h4>{item.qty}</h4>
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
    var url = window.location.pathname;
    var url_array = url.split("/");
    var id = url_array[3];
    var self = window;
    try {
      const csrf = document.getElementsByName("_csrf")[0].value;
      let submit = await axios.post(`/api/admin/orders`, {
        _csrf: csrf,
        form: this.state.form,
        allItems: this.state.allItems,
        id: id,
        deleteItemsId: this.state.deleteItemsId,
      });

      // checking if data is success then redirect to /admin/orders page
      if (submit.data.status === "success") {
        console.log("success================");
        console.log(submit.data);
        console.log("success================");
        self.location.href = `/admin/orders/${id}/edit`;
      } else {
        alert(`
          Status: ${submit.data.status} \n
          Message: ${submit.data.message} \n
          Error: ${submit.data.error} \n
          `);
      }
      console.log(submit);
    } catch (error) {
      console.log("====ERROR SUBMITTING FORM========");
      console.log(error);
      console.log("====ERROR========");
    }
  };

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
          <EditPopup
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

const editOrdersForm = document.getElementById("editOrdersForm");

ReactDOM.render(<Layout />, editOrdersForm);
