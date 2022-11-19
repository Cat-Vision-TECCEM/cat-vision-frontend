import { NextPage } from "next";
import PageNavigation from "../components/PageNavigation";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";

const dashboard: NextPage = () => {
  const router = useRouter()
  const [userType, setUserType] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [ libraries ] = useState<["places"]>(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "",
    libraries,
  });

  const getData = async () => {
    const orderData = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}order/getOrders?company_id=${1}`
    );
    const orderJSON = await orderData.json();
    setOrders(orderJSON.ordenes);
  };

  useEffect(() => {
    const userT = localStorage.getItem("type");
    setUserType(userT ? userT : "")
    if(userT === "company"){
      getData();
    }else if(userT === "store"){
      router.push("/grocery_stores/providers")
    }else{
      router.push("/login")
    }
  }, []);

  if(userType === "company"){
    return (
      <div className="dashboardContainer">
        <PageNavigation />
        <div className="dashboardContentContainer">
          <div className="dashboardContent">
            {isLoaded && <Map newStore={false} />}
          </div>
          <div className="dashboardContent">
            <div className="card">
              {orders.length > 0 && <p style={{ fontSize: 20 }}>Pedidos</p>}
              {orders &&
                orders.map((order, index) => {
                  return (
                    <div className="dashboardOrder" key={index}>
                      <p>A002134</p>
                      <p>{order.date}</p>
                      <div>
                        <p>$ {order.total}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* <div className="card"></div> */}
          </div>
        </div>
      </div>
    );
  } else{
    return(<p>Error!</p>)
  }
};

export default dashboard;
