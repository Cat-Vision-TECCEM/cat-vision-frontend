import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function ProductQuantity() {
  const [quantity, setQuantity] = useState(1);

  function less(quantity: number) {
    var lessProduct = quantity;
    if (quantity >= 1) {
      lessProduct = quantity - 1;
    } else {
      lessProduct = quantity;
    }
    setQuantity(lessProduct);
  }

  function more(quantity: number) {
    const moreProduct = quantity + 1;
    setQuantity(moreProduct);
  }

  return (
    <a>
      Cantidad:
      <AiOutlineMinus
        className="plus-minus-button"
        onClick={() => less(quantity)}
      />{" "}
      {quantity}
      <AiOutlinePlus
        className="plus-minus-button"
        onClick={() => more(quantity)}
      />
    </a>
  );
}

export default ProductQuantity;
