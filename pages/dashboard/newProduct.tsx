import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import PageNavigation from "../../components/PageNavigation";
import toast from "react-hot-toast";
import { useRouter } from "next/router";


const newProduct: NextPage = () => {
  const router = useRouter()
  const [userType, setUserType] = useState("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [sku, setSku] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const createProduct = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const creatingProduct = toast.loading("Creando Producto...");

    if (price > 0 && name.length > 3 && sku.length > 3 && image.length > 5) {
      const productData = {
        company_id: 1,
        sku,
        name,
        selling_price: price,
        image,
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      toast.dismiss(creatingProduct);
      toast.success("Producto Creado");
    } else {
      toast.dismiss(creatingProduct);
      toast.error(
        "No se pudo crear el producto, verifique que los campos esten correctos"
      );
    }
  };

  useEffect(() => {
    const userT = localStorage.getItem("type");
    setUserType(userT ? userT : "")
    if(userT === "store"){
      router.push("/grocery_stores/providers")
    }else{
      router.push("/login")
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "sku") {
      setSku(e.target.value);
    } else if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "price") {
      setPrice(parseInt(e.target.value));
    } else if (e.target.id === "image") {
      setImage(e.target.value);
    }
  };
  if(userType === "company"){

    return (
      <div className="createContainer">
        <PageNavigation />
        <form action="POST" className="formContainer">
          <div className="createProduct">
            <h1 style={{color: "white"}} >Agrega tu nuevo producto</h1>
            <div className="inputBox">
              <input
                type="text"
                required
                id="sku"
                onChange={handleChange}
                value={sku}
              />
              <span>SKU</span>
            </div>
  
            <div className="inputBox">
              <input
                type="text"
                required
                id="name"
                onChange={handleChange}
                value={name}
              />
              <span>Nombre</span>
            </div>
  
            <div className="inputBox">
              <input
                type="number"
                required
                min={0}
                id="price"
                onChange={handleChange}
                value={price}
              />
              <span>Precio</span>
            </div>
  
            <div className="inputBox">
              <input
                type="text"
                required
                id="image"
                onChange={handleChange}
                value={image}
              />
              <span>Imagen</span>
            </div>
  
            <input
              type="submit"
              value="Crear Tienda"
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                createProduct(e)
              }
            />
          </div>
        </form>
      </div>
    );
  }else {
    return <p>Error!</p>
  }
};

export default newProduct;
