import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import PageNavigation from "../../components/PageNavigation";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const newProduct: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(3);
  const [sku, setSku] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [fileSelected, setFileSelected] = useState<boolean>(false);

  const createProduct = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const creatingProduct = toast.loading("Creando Producto...");

    if (price > 3 && name.length > 3 && sku.length > 3) {
      const productData = new FormData();
      productData.append('company_id', companyId);
      productData.append('sku', sku);
      productData.append('name', name);
      productData.append('selling_price', price.toString());
      productData.append('image', image);
      console.log(token);

      const createProduct = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}product/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      });

      const jsonCreateProduct = await createProduct.json();
      toast.dismiss(creatingProduct);
      if(jsonCreateProduct.error){
        toast.error(
          jsonCreateProduct.error
        );
      }else{
        toast.success(jsonCreateProduct.success);
      }
      
    } else {
      toast.dismiss(creatingProduct);
      toast.error(
        "No se pudo crear el producto, verifique que los campos esten correctos"
      );
    }
  };

  useEffect(() => {
    const userT = localStorage.getItem("type");
    const token = localStorage.getItem("token");
    setToken(token || "");
    setCompanyId(localStorage.getItem("company_id") || "1");
    setUserType(userT ? userT : "");
    if (userT === "company") {
    } else if (userT === "store") {
      router.push("/grocery_stores/providers");
    } else {
      router.push("/login");
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
      if(e.target.files){
        setFileSelected(true);
        setImage(e.target.files[0]);
      }
    }
  };

  if (userType === "company") {
    return (
      <div className="createContainer">
        <PageNavigation />
        <form action="POST" className="formContainer">
          <div className="createProduct">
            <h1 style={{ color: "white" }}>Agrega tu nuevo producto</h1>
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
                min={3}
                id="price"
                onChange={handleChange}
                value={price}
              />
              <span>Precio</span>
            </div>

            <label htmlFor="image" className="fileInput">
              <input type="file" onChange={handleChange} id="image" required />
              {fileSelected === false && <span>Añadir Imágen del producto</span> }
              {fileSelected && <span>Imágen: {image.name}</span> }
            </label>

            <input
              type="submit"
              value="Crear Producto"
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                createProduct(e)
              }
            />
          </div>
        </form>
      </div>
    );
  } else {
    return <p>Error!</p>;
  }
};

export default newProduct;
