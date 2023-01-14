import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import { Media } from "reactstrap";
import { useRouter } from "next/router";

const CartHeader = ({ item }) => {
  const router = useRouter();
  const context = useContext(CartContext);
  const clickProductDetail = (product) => {
    const titleProps = product.attributes.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`, undefined, { shallow: true });
  };
  return (
    <Fragment>
      <li>
        <div className="media">
          {
          !item.attributes.img_shop_compare_736_1000.data[0]
          ?
          ''
          :
          <div onClick={() => clickProductDetail(item)}>
              <Media alt="" className="me-3" src={`${item.attributes.img_shop_compare_736_1000.data[0].attributes.url}`} />
          </div>

          }
          <div className="media-body">
            <div onClick={() => clickProductDetail(item)}>
                <h6>{item.attributes.title}</h6>
            </div>

            <h4>
              <span>
                {item.qty} x $
                {item.attributes.price}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
