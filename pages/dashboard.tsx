import { NextPage } from "next";
import PageNavigation from "../components/PageNavigation";
import Map from "../components/Map";
import { useEffect, useState } from "react";


const dashboard: NextPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const getData = async () => {
    const orderData = await fetch(
      `http://127.0.0.1:8080/order/getOrders?company_id=${1}`
    );
    const orderJSON = await orderData.json();
    setOrders(orderJSON.ordenes);
  }

  useEffect(() => {
    getData();
  }, []);

  return(
    <div className="dashboardContainer">
      <PageNavigation />
      <div className="dashboardContentContainer">
        <div className="dashboardContent">
          <Map />
        </div>
        <div className="dashboardContent">
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
          <div className="card"></div>
        </div>
      </div>
    </div>
  )
}

export default dashboard