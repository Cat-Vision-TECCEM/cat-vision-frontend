import Link from "next/link";
import { useState, useEffect } from "react";

import ProductQuantity from "./ProductQuantity";

function NewProduct() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<any[]>([]);

  const getData = async () => {
    const company_id = {
      company_id: 1,
    };
    const storeProducts = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}nuc/get-products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company_id),
      }
    );
    const jsonProducts = await storeProducts.json();
    setProducts(jsonProducts);
  };

  useEffect(() => {
    getData();
  }, []);

  function addToCart(name: string) {
    return { name: name };
  }

  // if (products) {
  //   const newProductCard = products.map((product) => (
  //     <div className="new-product-card">
  //       <div className="product-panel">
  //         <div className="product-container">
  //           <img
  //             className="product-image"
  //             src={product.src}
  //             alt={product.alt}
  //           />
  //         </div>
  //         <div>
  //           <div className="product-name">
  //             <a>{product.name}</a>
  //           </div>
  //           <div>
  //             <a>Cantidad:</a>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="price-container">
  //         <div className="price-panel">
  //           <a>Total: ${product.price}</a>
  //         </div>
  //         <div>
  //           <button className="add-button" type="submit">
  //             Añadir al carrito
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   ));
  //   return <div className="product-card-container">{newProductCard}</div>;
  // } else {
  //   return <p>Error al obtener productos</p>;
  // }
  return (
    <div className="product-card-container">
      {Object.keys(products).map((key, index) => {
        return (
          <div className="new-product-card" key={index}>
            <div className="product-panel">
              <div className="product-container">
                {/* <img
                  className="product-image"
                  src={product.src}
                  alt={product.alt}
                /> */}
                <img
                  className="product-image"
                  src="https://www.coca-colamexico.com.mx/content/dam/journey/mx/es/private/brand-detail/fanta/Naranja1.png"
                  alt="imagen del producto"
                />
              </div>
              <div>
                <div className="product-name">
                  <a>{key}</a>
                </div>
                <div>
                  <ProductQuantity />
                </div>
              </div>
            </div>
            <div className="price-container">
              <div className="price-panel">
                {/* <a>Total: ${product.price}</a> */}
                <a>Precio: $10</a>
              </div>
              <div>
                <button
                  onClick={() => addToCart(key)}
                  className="add-button"
                  type="submit"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NewProduct;
