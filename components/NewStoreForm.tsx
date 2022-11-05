import { Fragment } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type NewStoreProps = {
  setNewStore: (position: google.maps.LatLngLiteral) => void;
};

function NewStoreForm() {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  return (
    <Fragment>
      <div className="inputBox">
        <input type="text" required/>
        <span>Nombre Tienda</span>
      </div>
      <div className="inputBox">
        <input type="text" required/>
        <span>Dirección Tienda</span>
      </div>
      <div className="inputBox">
        <input type="text" required/>
        <span>Ciudad</span>
      </div>
      <div className="inputBox">
        <input type="text" required/>
        <span>Estado</span>
      </div>
      <div className="inputBox">
        <input type="text" required/>
        <span>Calle</span>
      </div>
      <div className="inputBox">
        <input type="number" min="0" required/>
        <span>Número</span>
      </div>
      <input type="submit" value="Crear Tienda" />
    </Fragment>
  );
}

export default NewStoreForm;
