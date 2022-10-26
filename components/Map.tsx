import styles from "../styles/Map.module.css";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

function Map() {
  const [stores, setStores] = useState<LatLngLiteral[]>([]);
  const getStores = async () => {
    const storesData = await fetch("http://127.0.0.1:8080/store/getAllStores");
    const jsonStores = await storesData.json();
    let counter = 0;
    for(var k in jsonStores.stores){
      ++counter;
      if(counter < 8){
        const results = await getGeocode({address: jsonStores.stores[k].address});
        const {lat, lng} = await getLatLng(results[0]);
        setStores(stores => [...stores, {lat, lng}])
      }
    }
  };
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : "",
    libraries: ["places"],
  });
  
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 19.43, lng: -99.13 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "d4c619bb7dbcd015",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    getStores();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={12}
      center={center}
      mapContainerClassName="card"
      options={options}
      mapContainerStyle={{ width: "100%" }}
    >
      {stores.map((store, index) => <Marker key={index} position={store} />)}
    </GoogleMap>
  );
}

export default Map;
