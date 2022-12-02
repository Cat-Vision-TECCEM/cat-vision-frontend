import Link from "next/link";
import { useState, useEffect, useId } from "react";
import ProductQuantity from "./ProductQuantity";

function NewProduct() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<any[]>([]);

  const getData = async () => {
    const company_id = {
      company_id: 1,
    };
    const storeProducts = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}product/get-all`,
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

  function addToCart(
    id: number,
    src: string,
    alt: string,
    name: string,
    total: number,
    quantity: number
  ) {
    const productCart = {
      id: id,
      src: src,
      alt: alt,
      name: name,
      total: total,
      quantity: quantity,
    };
    return productCart;
  }

  if (products) {
    return (
      <div className="product-card-container">
        {products.map((product, index) => {
          return (
            <div className="new-product-card" key={index}>
              <div className="product-panel">
                <div className="product-container">
                  <img
                    className="product-image"
                    src={product.image}
                    alt="producto"
                  />
                </div>
                <div>
                  <div className="product-name">
                    <a>{product.name}</a>
                  </div>
                  <div>
                    <ProductQuantity />
                  </div>
                </div>
              </div>
              <div className="price-container">
                <div className="price-panel">
                  <a>Total: ${product.price}</a>
                </div>
                <div>
                  <button
                    onClick={() =>
                      addToCart(
                        Math.random(),
                        product.image,
                        "producto",
                        product.name,
                        product.price,
                        1
                      )
                    }
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
  } else {
    return <p>Error al obtener productos</p>;
  }
}

export default NewProduct;
