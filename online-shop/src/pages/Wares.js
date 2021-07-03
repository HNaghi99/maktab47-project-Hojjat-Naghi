import { required } from "joi";
import React, { Component } from "react";
import { getProducts } from "../api/Api";
export class Wares extends Component {
  async componentDidMount() {
    const value = await getProducts();
    // const logo = required('./asset/image/logo.png');
    console.log("value is:", value);
  }
  render() {
    return (
      <>
        ware
        {/* <img src={"http://localhost:3000/src/images/logo.png"} /> */}
      </>
    );
  }
}
