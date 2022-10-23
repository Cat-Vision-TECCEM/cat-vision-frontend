import styles from "../styles/Map.module.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { 
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer, 
} from "@react-google-maps/api";


function Map(){
  const center = useMemo(() => ({lat: 19.43, lng: -99.13}), []) 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCRrWXwt1eidGW-sK-5DdDU-nWYUoiLSkk",
    libraries: ["places"]
  });

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap 
      zoom={12}
      center={center}
      mapContainerClassName="card"
      mapContainerStyle={{ width: "100%" }}
    >

    </GoogleMap>
  )
}

export default Map