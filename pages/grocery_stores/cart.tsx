import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import GroceriesNavigation from "../../components/GroceriesNavigation";
import NewProductCart from "../../components/NewProductCart";

const cart: NextPage = () => {
  return (
    <div>
      <GroceriesNavigation />
      <div className="cart-container">
        <h1>Carrito</h1>
        <hr />
        <div>
          <NewProductCart />
        </div>
        <div>
          <a className="total">Total: $0</a>
        </div>
      </div>
    </div>
  );
};

export default cart;
