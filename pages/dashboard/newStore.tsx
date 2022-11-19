import { NextPage } from "next";
import { useState, useEffect } from "react";
import Map from "../../components/Map";
import PageNavigation from "../../components/PageNavigation";
import { useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";

const newStore: NextPage = () => {
  const [userType, setUserType] = useState("");
  const router = useRouter();
  const [ libraries ] = useState<["places"]>(['places']);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "",
    libraries,
  });

  useEffect(() => {
    const userT = localStorage.getItem("type");
    setUserType(userT ? userT : "")
    if(userT === "store"){
      router.push("/grocery_stores/providers")
    }else{
      router.push("/login")
    }
  }, []);

  if(userType === "company"){
    return (
      <div className="createContainer">
        <PageNavigation />
        <form action="POST" className="formContainer">
          <div className="createStore">{isLoaded && <Map newStore={true} />}</div>
        </form>
      </div>
    );
  }else {
    return <p>Error!</p>
  }
};

export default newStore;
