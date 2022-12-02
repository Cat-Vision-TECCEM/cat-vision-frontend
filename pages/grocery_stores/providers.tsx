import { NextPage } from "next";
import React, { useState, useId } from "react";
import NewProviderCard from "../../components/NewProviderCard";
import GroceriesNavigation from "../../components/GroceriesNavigation";

interface Providers {
  id: number;
  address: string;
  label: string;
  value: string;
}

const providers: NextPage = () => {
  const providersNames = [
    {
      name: "Femsa"
    }
  ];
  const [providers, setProviders] = useState([])

  /*useEffect(() => {
    const userT = localStorage.getItem("type");
    setUserType(userT ? userT : "")
    if(userT === "store"){

    }if(userT === "company"){
      router.push("/dashboard")
    }else{
      router.push("/login")
    }
  }, []);*/

  //if(userType === "store"){
    return (
      <div>
        <GroceriesNavigation />
        <NewProviderCard />
      </div>
    );
  //}else return <p>Error!</p>
};

export default providers