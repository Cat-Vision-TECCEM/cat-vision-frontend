import { NextPage } from "next";
import Select from "react-select";
import PageNavigation from "../../components/PageNavigation";
import { ChangeEvent, useEffect, useId, useState } from "react";
import Image from "next/image";

interface Store {
  id: number;
  address: string;
  label: string;
  value: string;
}

const stores: NextPage = () => {
  const st = {
    id: 1,
    address: "",
    label: "",
    value: "",
  };

  const today = new Date();
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState<Store>(st);
  const [startDate, setStartDate] = useState(`${today.getFullYear()}-${today.getMonth() + 1}`);
  const [startMonth, setStartMonth] = useState(`${today.getMonth() + 1}`);
  const [startYear, setStartYear] = useState(`${today.getFullYear()}`);
  const [endMonth, setEndMonth] = useState(`${today.getMonth() + 2}`);
  const [endYear, setEndYear] = useState(`${today.getFullYear()}`);

  const [products, setProducts] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<number>(0);
  const [totalSaleProducts, setTotalSaleProducts] = useState<number>(0);

  const getStores = async () => {
    const storesData = await fetch("http://127.0.0.1:8080/store/getAllStores");
    const jsonStores = await storesData.json();
    setStores(jsonStores.stores);    
  };

  const handleStartDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setStartYear(selectedDate.slice(0, 4));
    setStartMonth(selectedDate.slice(5));
    setStartDate(selectedDate);
  }

  const handleEndDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setEndYear(selectedDate.slice(0, 4));
    setEndMonth(selectedDate.slice(5));
  }

  const getData = async () => {
    const storeProducts = await fetch(
      `http://127.0.0.1:8080/store/getProducts?store_id=${store.id}`
    );
    const jsonProducts = await storeProducts.json();
    setProducts(jsonProducts.products);
    const salesData = await fetch(
      `http://127.0.0.1:8080/order/getSalesProduct?start_month=${startMonth}&start_year=${startYear}&store_id=${store.id}&end_month=${endMonth}&end_year=${endYear}`
    );
    const salesJSON = await salesData.json();
    console.log(salesJSON);
    
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="dashboardContainer">
      <PageNavigation />
      <div className="dashboardContentStore" style={{ paddingBottom: 0 }}>
        <div className="filters">
          <Select
            options={stores}
            instanceId={useId()}
            isSearchable
            onChange={(store) => setStore(store ? store : st)}
          />
          <div className="dashboardInputs">
            <label htmlFor="">Fecha Inicio: </label>
            <input type="month" min="2022-08" value={startDate} onChange={(e) => handleStartDateInput(e)} required/>
          </div>
          <div className="dashboardInputs">
            <label htmlFor="">Fecha Fin: </label>
            <input type="month" min="2022-08" onChange={(e) => handleEndDateInput(e)}/>
          </div>
          <input type="submit" value="Filtrar" onClick={getData}/>
        </div>
        <div className="card cardTop"></div>
        <div className="card cardTop"></div>
      </div>

      <div className="dashboardContentStore">
        <div className="card twoSpaces">
          {products.map( (product, index) => {
            return(
              <div className="productChart" key={index}>
                <Image 
                  loader={()=>product.url}
                  src={product.url}
                  alt="Imagen producto"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="productChartInfo">
                  <p>{product.name}</p>
                  <p>
                    Estado: 
                    {product.stock ? 
                      <span style={{color: "green"}}> Existente</span>: 
                      <span style={{color: "red"}}> Agotado</span>
                    }
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="card">
          
        </div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default stores;
