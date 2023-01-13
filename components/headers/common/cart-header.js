import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import { Media } from "reactstrap";

const CartHeader = ({ item }) => {
  const context = useContext(CartContext);
  return (
    <Fragment>
      <li>
        <div className="media">
          {
          !item.attributes.img_shop_compare_736_1000.data[0]
          ?
          ''
          :
          <Link href={"/product-details/" + item.id}>
              <Media alt="" className="me-3" src={`${item.attributes.img_shop_compare_736_1000.data[0].attributes.url}`} />
          </Link>

          }
          <div className="media-body">
            <Link href={"/product-details/" + item.id}>
                <h6>{item.attributes.title}</h6>
            </Link>

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
