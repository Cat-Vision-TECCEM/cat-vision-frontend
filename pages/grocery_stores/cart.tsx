import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import GroceriesNavigation from "../../components/GroceriesNavigation";
import { useRouter } from "next/router";

const cart: NextPage = () => {
  const [userType, setUserType] = useState("");
  const router = useRouter()


  useEffect(() => {
    const userT = localStorage.getItem("type");
    setUserType(userT ? userT : "")
    if(userT === "company"){
      router.push("/dashboard")
    }else{
      router.push("/login")
    }
  }, []);

  if(userType === "store"){
    return (
      <div>
        <GroceriesNavigation />
        <h1>Carrito</h1>
      </div>
    );
  }else return <p>Error!</p>
};

export default cart;
