import React, { Fragment, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import toast from "react-hot-toast";

type NewStoreProps = {
  setNewStore: (position: google.maps.LatLngLiteral) => void;
};

function NewStoreForm({ setNewStore }: NewStoreProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [latitude, setLat] = useState<number>();
  const [longitude, setLng] = useState<number>();

  const appearSearchOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      const search = document.querySelector<HTMLElement>(".searchOptions");
      if (search && target.value !== "null") {
        search.style.display = "block";
      }
      setValue(target.value);
    }
  };

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(results[0]);
    setLat(lat);
    setLng(lng);
    setNewStore({ lat, lng });
  };

  const createStore = async (e: React.MouseEvent<HTMLInputElement>) => {
    const company_id = localStorage.getItem("company_id")
    e.preventDefault();
    const creatingStore = toast.loading("Creando Tienda...");
    const values = value.split(",");
    if (values.length > 4) {
      const storeData = {
        name: values[0].trim(),
        state: values[4].trim(),
        street: values[1].trim(),
        number: 0,
        city: values[3].trim(),
        lat: latitude,
        lng: longitude,
        company_id: company_id,
      };
      const createStorePost = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}store/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      });
      const createStoreJSON = await createStorePost.json();
      toast.dismiss(creatingStore);
      if(createStoreJSON.error){
        toast.error(createStoreJSON.error)
      }else{
        toast.success("Tienda Creada");
      }

    } else {
      toast.dismiss(creatingStore);
      toast.error("No se pudo solicitar la tienda en la dirección seleccionada!");
    }
  };

  return (
    <Fragment>
      <div className="inputBox">
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            appearSearchOptions(e)
          }
          disabled={!ready}
          required
        />
        <span>Dirección Tienda</span>

        {status === "OK" && (
          <div className="searchOptions">
            {data.map(({ place_id, description }) => (
              <div key={place_id} onClick={() => handleSelect(description)}>
                {description}
              </div>
            ))}
          </div>
        )}
      </div>
      <input
        type="submit"
        value="Solicitar Tienda"
        onClick={(e: React.MouseEvent<HTMLInputElement>) => createStore(e)}
      />
    </Fragment>
  );
}

export default NewStoreForm;
