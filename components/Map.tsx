import styles from "../styles/Map.module.css";
import NewStoreForm from "./NewStoreForm";
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

function Map({ newStore }: { newStore: boolean }) {

  const [stores, setStores] = useState<LatLngLiteral[]>([]);
  const [store, setNewStore] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  
  const getStores = async () => {
    let storesArray = []
    const storesData = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}store/getAllStores`
    );
    const jsonStores = await storesData.json();
    for (var k in jsonStores.stores) {
      storesArray.push(jsonStores.stores[k].address)
    }
    setStores(storesArray)    
  };

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

  const onLoad = useCallback((map: any) => (mapRef.current = map), [])

  useEffect(() => {
    getStores();
  }, []);

  return (
    <Fragment>
      {newStore && (
        <div className={styles.mapContainer}>
          <h1>Solicita una nueva tienda</h1>
          <NewStoreForm 
            setNewStore = {(position) => {
              setNewStore(position);
              mapRef.current?.panTo(position);
              console.log(mapRef);
            }}
          />
        </div>
      )}
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="card"
        onLoad= {onLoad}
        options={options}
        mapContainerStyle={{ width: "100%" }}
      >
        {stores.map((store, index) => (
          <Marker key={index} position={store} />
        ))}
        {store && <Marker position={store} />}
      </GoogleMap>
    </Fragment>
  );
}

export default Map;
