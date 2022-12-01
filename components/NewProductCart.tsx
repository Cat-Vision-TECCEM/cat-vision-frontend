import { Fragment, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import addToCart from "./NewProduct";

function NewProductCart() {
  const [selectedProducts, setSelectedProducts] = useState([
    {
      id: 1,
      src: "https://www.coca-colamexico.com.mx/content/dam/journey/mx/es/private/brand-detail/ynada/Naranja.png",
      alt: "product name",
      name: "NaranjayNada",
      total: 10,
      quantity: 1,
    },
    {
      id: 2,
      src: "https://www.coca-colamexico.com.mx/content/dam/journey/mx/es/private/brand-detail/ynada/Naranja.png",
      alt: "product name",
      name: "NaranjayNada",
      total: 10,
      quantity: 1,
    },
  ]);

  const [selectedProducts2, setSelectedProducts2] = useState({
    id: "",
    src: "",
    alt: "",
    total: "",
    quantity: "",
  });

  function deleteCartItem(id: number) {
    const newCart = selectedProducts.filter((l) => l.id !== id);
    setSelectedProducts(newCart);
  }

  const cartProducts = selectedProducts.map((props) => (
    <Fragment>
      <div className="product-cart-container">
        <img className="image-cart-container" src={props.src} alt={props.alt} />
        <div className="cart-price-container">
          <a className="product-name">{props.name}</a>
          <a>Cantidad: {props.quantity}</a>
        </div>
        <div className="close">
          <FaWindowClose onClick={() => deleteCartItem(props.id)} />
        </div>
      </div>

      <div>
        <hr />
      </div>
    </Fragment>
  ));
  return <div>{cartProducts}</div>;
}

export default NewProductCart;
