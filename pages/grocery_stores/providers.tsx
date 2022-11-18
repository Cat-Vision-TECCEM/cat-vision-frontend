import { NextPage } from "next";
import React, { useState, useId } from "react";
import NewProviderCard from "../../components/NewProviderCard";
import GroceriesNavigation from "../../components/GroceriesNavigation";
import Select from "react-select";

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
  const pr = {
  id: 1,
  address: "",
  label: "Buscar Proveedor",
  };

  const [providers, setProviders] = useState([])

  return(
    <div>
      <GroceriesNavigation/>
      <div className="search-bar">
        <Select 
        options={providers}
        instanceId={useId()}
        isSearchable
        defaultValue={ pr }
        />
      </div>
      <NewProviderCard/>
    </div>
  )
}

export default providers