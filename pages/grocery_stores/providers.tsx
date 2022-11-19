import { NextPage } from "next";
import React, { useState, useId, useEffect } from "react";
import NewProviderCard from "../../components/NewProviderCard";
import GroceriesNavigation from "../../components/GroceriesNavigation";
import Select from "react-select";
import { useRouter } from "next/router";


interface Providers {
  id: number;
  address: string;
  label: string;
  value: string;
}

const providers: NextPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  const providersNames = [
    {
      name: "Femsa",
    },
  ];
  const pr = {
    id: 1,
    address: "",
    label: "Buscar Proveedor",
  };

  const [providers, setProviders] = useState([]);

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
        <div className="search-bar">
          <Select
            options={providers}
            instanceId={useId()}
            isSearchable
            defaultValue={pr}
          />
        </div>
        <NewProviderCard />
      </div>
    );
  }else return <p>Error!</p>
};

export default providers;
