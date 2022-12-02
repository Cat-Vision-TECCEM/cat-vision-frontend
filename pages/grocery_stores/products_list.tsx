import { NextPage } from "next";
import React, { useState, useId, useEffect } from "react";
import GroceriesNavigation from "../../components/GroceriesNavigation";
import { useRouter } from "next/router";
import NewProduct from "../../components/NewProduct";
import Select from "react-select";

const products_list: NextPage = () => {
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
      <div>
        <NewProduct />
      </div>
    </div>
  );
  //}else return <p>Error!</p>
};

export default products_list;
