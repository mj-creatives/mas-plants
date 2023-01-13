import React, { useContext } from "react";
import { Input } from "reactstrap";
import CartContext from "../../../helpers/cart";

const DetailBox = ({ item }) => {
  const cartContext = useContext(CartContext);
  const addToCart = cartContext.addToCart;
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="product-right product-form-box" style={{borderRadius: "15px"}}>
      <h4>
        <del>${((item.product.data.attributes.price + (item.product.data.attributes.price * 20) / 100)).toFixed(2)}</del>
      </h4>
      <h3>
        $
        {item.product.data.attributes.price}
      </h3>
      <div className="product-description border-product">
        <h6 className="product-title">quantity</h6>
        <div className="qty-box">
          <div className="input-group">
            <span className="input-group-prepend">
              <button
                type="button"
                className="btn quantity-left-minus"
                onClick={minusQty}
                data-type="minus"
                data-field=""
              >
                <i className="fa fa-angle-left"></i>
              </button>
            </span>
            <Input
              type="text"
              name="quantity"
              value={quantity}
              onChange={changeQty}
              className="form-control input-number"
              style={{border: "none"}}
            />
            <span className="input-group-prepend">
              <button
                type="button"
                className="btn quantity-right-plus"
                onClick={() => plusQty(item.product.data)}
                data-type="plus"
                data-field=""
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="product-buttons">
        <a
          href={null}
          data-toggle="modal"
          data-target="#addtocart"
          onClick={() => addToCart(item.product.data, quantity)}
          className="btn btn-solid"
        >
          add to cart
        </a>{" "}
        <a href="#" className="btn btn-solid">
          buy now
        </a>
      </div>
    </div>
  );
};

export default DetailBox;
