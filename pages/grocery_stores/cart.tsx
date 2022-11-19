import { NextPage } from "next";
import React, { useState } from "react";
import GroceriesNavigation from "../../components/GroceriesNavigation";

const cart: NextPage = () => {
    return(
        <div>
            <GroceriesNavigation/>
            <h1>Carrito</h1>
        </div>
    )
}

export default cart