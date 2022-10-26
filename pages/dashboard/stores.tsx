import { NextPage } from "next";
import Select from "react-select";
import PageNavigation from "../../components/PageNavigation";
import { ChangeEvent, Fragment, useEffect, useId, useState } from "react";
import Image from "next/image";
import { MdPointOfSale } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import toast from "react-hot-toast";
import DoughnutChart from "../../components/DoughnutChart";
import LineChart from "../../components/LineChart";

interface Store {
  id: number;
  address: string;
  label: string;
  value: string;
}
interface ChartJsData {
  labels: string[];
  datasets: [
    {
      label: string;
      data: string[];
      backgroundColor: string[];
      borderColor: string[];
      color: string;
    }
  ];
}

const stores: NextPage = () => {
  const st = {
    id: 1,
    address: "",
    label: "Abarrotes La Diana",
    value: "Abarrotes La Diana",
  };

  const today = new Date();
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState<Store>(st);
  const [startDate, setStartDate] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}`
  );
  const [startMonth, setStartMonth] = useState(`${today.getMonth() + 1}`);
  const [startYear, setStartYear] = useState(`${today.getFullYear()}`);
  const [endMonth, setEndMonth] = useState(`${today.getMonth() + 2}`);
  const [endYear, setEndYear] = useState(`${today.getFullYear()}`);

  const [products, setProducts] = useState<any[]>([]);
  const [sales, setSales] = useState<ChartJsData>();
  const [lineSales, setLineSales] = useState<ChartJsData>();
  const [earnings, setEarnings] = useState<number>(0);
  const [totalSaleProducts, setTotalSaleProducts] = useState<number>(0);
  const [orders, setOrders] = useState<any[]>([]);
  const chartBackground = [
    "#003f5cbd",
    "#2f4b7cbd",
    "#665191bd",
    "#a05195bd",
    "#d45087bd",
    "#f95d6abd",
    "#ff7c43bd",
    "#ffa600bd",
  ];
  const chartBorder = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
  ];

  const getStores = async () => {
    const storesData = await fetch("http://127.0.0.1:8080/store/getAllStores");
    const jsonStores = await storesData.json();
    setStores(jsonStores.stores);
  };

  const handleStartDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setStartYear(selectedDate.slice(0, 4));
    setStartMonth(selectedDate.slice(5));
    setStartDate(selectedDate);
  };

  const handleEndDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setEndYear(selectedDate.slice(0, 4));
    setEndMonth(selectedDate.slice(5));
  };

  const getData = async () => {
    const loadingData = toast.loading("Cargando Datos");
    const storeProducts = await fetch(
      `http://127.0.0.1:8080/store/getProducts?store_id=${store.id}`
    );
    const jsonProducts = await storeProducts.json();
    setProducts(jsonProducts.products);
    const salesData = await fetch(
      `http://127.0.0.1:8080/order/getSalesProduct?start_month=${startMonth}&start_year=${startYear}&store_id=${store.id}&end_month=${endMonth}&end_year=${endYear}`
    );
    const salesJSON = await salesData.json();
    let counter = 0;
    let labels: string[] = [];
    let datasets: string[] = [];
    for (var k in salesJSON) {
      if (k === "0") {
        setEarnings(salesJSON[k].total_earns);
        for (var k2 in salesJSON[k].totals_products) {
          counter += salesJSON[k].totals_products[k2];
          labels.push(k2);
          datasets.push(salesJSON[k].totals_products[k2]);
        }
        setTotalSaleProducts(counter);
        setSales({
          labels: labels,
          datasets: [
            {
              label: "Total Product Sales",
              data: datasets,
              backgroundColor: chartBackground,
              borderColor: chartBorder,
              color: "#fff",
            },
          ],
        });
        labels = [];
        datasets = [];
      } else {
        labels.push(k);
        datasets.push(salesJSON[k].total);
      }
    }
    setLineSales({
      labels: labels,
      datasets: [
        {
          label: "Ventas",
          data: datasets,
          backgroundColor: chartBackground,
          borderColor: chartBorder,
          color: "#fff",
        },
      ],
    });

    const orderData = await fetch(
      `http://127.0.0.1:8080/order/getOrders?store_id=${store.id}&company_id=${1}`
    );
    const orderJSON = await orderData.json();
    setOrders(orderJSON.ordenes);

    toast.dismiss(loadingData);
    toast.success("Datos cargados");
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
            defaultValue={ st }
          />
          <div className="dashboardInputs">
            <label htmlFor="">Fecha Inicio: </label>
            <input
              type="month"
              min="2022-01"
              value={startDate}
              onChange={(e) => handleStartDateInput(e)}
              required
            />
          </div>
          <div className="dashboardInputs">
            <label htmlFor="">Fecha Fin: </label>
            <input
              type="month"
              min="2022-01"
              onChange={(e) => handleEndDateInput(e)}
            />
          </div>
          <input type="submit" value="Filtrar" onClick={getData} />
        </div>
        <div className="card cardTop">
          {earnings > 0 && (
            <Fragment>
              <div>
                <FaMoneyBill />
                <p>$ {earnings}</p>
                <p>Ganancias Obtenidas</p>
              </div>
              <div></div>
            </Fragment>
          )}
        </div>
        <div className="card cardTop">
          {totalSaleProducts > 0 && (
            <Fragment>
              <div>
                <MdPointOfSale />
                <p>{totalSaleProducts}</p>
                <p>Productos Vendidos</p>
              </div>
              <div></div>
            </Fragment>
          )}
        </div>
      </div>

      <div className="dashboardContentStore">
        <div className="card twoSpaces">
          {products.map((product, index) => {
            return (
              <div className="productChart" key={index}>
                <Image
                  loader={() => product.url}
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
                    {product.stock ? (
                      <span style={{ color: "rgb(0, 255, 149)" }}>
                        {" "}
                        Existente
                      </span>
                    ) : (
                      <span style={{ color: "red" }}> Agotado</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card">
          {orders.length > 0 && <p style={{fontSize: 20}}>Pedidos</p>}
          {orders && orders.map((order, index) => {
            return(
              <div className="dashboardOrder" key={index}>
                <p>A002134</p>
                <p>{order.date}</p>
                <div>
                  <p>$ {order.total}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="card">
          {sales && <DoughnutChart chartData={sales} />}
        </div>
        <div className="card">
          {lineSales && <LineChart chartData={lineSales} />}
        </div>
        {/* <div className="card"></div> */}
      </div>
    </div>
  );
};

export default stores;
