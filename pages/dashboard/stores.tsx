import { NextPage } from "next";
import Select from "react-select";
import PageNavigation from "../../components/PageNavigation";
import { useEffect, useState } from "react";

interface Store {
  id: number,
  address: string,
  label: string,
  value: string
}

const stores: NextPage = () => {
  const [stores, setStores] = useState([]);

  const getStores = async () => {
    const storesData = await fetch("http://127.0.0.1:8080/store/getAllStores");
    const jsonStores = await storesData.json();
    setStores(jsonStores.stores)
  };

  const st = {
    id: 1,
    address: "",
    label: "",
    value: ""
  }

  const getData = async (store: Store) => {
    console.log(store.id);
  }

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="dashboardContainer">
      <PageNavigation />
      <div className="dashboardContentStore" style={{ paddingBottom: 0 }}>
        <Select options={stores} isSearchable onChange={(store) => getData(store ? store : st)}/>
      </div>

      <div className="dashboardContentStore">
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default stores;
