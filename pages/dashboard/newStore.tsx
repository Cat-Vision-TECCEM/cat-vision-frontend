import { NextPage } from "next";
import { useState } from "react";
import Map from "../../components/Map";
import PageNavigation from "../../components/PageNavigation";
import { useLoadScript } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;

const newStore: NextPage = () => {
  const [ libraries ] = useState<["places"]>(['places']);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      : "",
    libraries,
  });

  return (
    <div className="createContainer">
      <PageNavigation />
      <form action="POST" className="formContainer">
        <div className="createStore">{isLoaded && <Map newStore={true} />}</div>
      </form>
    </div>
  );
};

export default newStore;
