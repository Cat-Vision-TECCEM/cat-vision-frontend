import { NextPage } from "next";
import React, { useState } from "react";
import GroceriesNavigation from "../../components/GroceriesNavigation";
import NewProductCart from "../../components/NewProductCart";
import { useRouter } from "next/router";

const cart: NextPage = () => {
  const [userType, setUserType] = useState("");
  const router = useRouter();

  /*useEffect(() => {
  const userT = localStorage.getItem("type");
  setUserType(userT ? userT : "")
  if(userT === "store"){

  }else if(userT === "company"){
    router.push("/dashboard")
  }else{
    router.push("/login")
    }
  }, []);*/

  //if(userType === "store"){
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
  //}else return <p>Error!</p>
};

export default cart;
