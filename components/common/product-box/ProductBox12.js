import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import CartContext from "../../../helpers/cart";

const ProductItem = ({
  product,
  addCart,
  addToCompare,
  spanClass,
}) => {
  const router = useRouter();
  const cartContext = useContext(CartContext);

  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleCompare = () => setModalCompare(!modalCompare);

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = () => {
    const titleProps = product.attributes.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`, undefined, { shallow: true });
  };

  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.attributes.isNew === "true" ? <span className="lable3">new</span> : ""}
          {product.attributes.type === "trending" ? (
            <span className="lable4">Trending</span>
          ) : (
            ""
          )}
        </div>
        {
        !product.attributes.img_home_768_864.data[0] 
        ? 
        '' 
        : 
        <div className="front">
          <a href={null}>
            <Media
              alt=""
              src={product.attributes.img_home_768_864.data[0].attributes.url}
              className="img-fluid blur-up lazyload bg-img"
            />
          </a>
        </div>
        }
        <div className="cart-info cart-wrap">
          <button onClick={addCart} title="Add to cart">
            <i className="fa fa-shopping-cart"></i>
            {spanClass ? <span>Add to cart</span> : ""}
          </button>
          <a href={null} title="Compare" onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
          <Modal
            isOpen={modalCompare}
            toggle={toggleCompare}
            centered
          >
            <ModalHeader toggle={toggleCompare}>Quick View</ModalHeader>
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                  {
                    !product.attributes.img_home_768_864.data[0] 
                    ? 
                    '' 
                    : 
                    <Media
                      src={product.attributes.img_home_768_864.data[0].attributes.url}
                      alt=""
                      className="img-fluid"
                    />
                  }
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>Item{" "}
                        <span>{product.attributes.title} </span>
                        <span> successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link
                        className="btn-sm btn-solid"
                        onClick={addToCompare} 
                        href="/page/compare">
                          View Compare list
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        <div className="quick-view-part">
          <a
            className="mobile-quick-view"
            href={null}
            data-toggle="modal"
            data-target="#quick-view"
            title="Quick View"
            onClick={toggle}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div className="product-info">
        <div className="rating"></div>
        <h6>{product.attributes.title}</h6>
        <h4>
          $
          {product.attributes.price}
          <del>
            <span className="money">
              $
              {((product.attributes.price + (product.attributes.price * 20) / 100)).toFixed(2)}
            </span>
          </del>
        </h4>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="quickview-modal"
        size="lg"
        centered
      >
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
              {
                !product.attributes.img_home_768_864.data[0] 
                ? 
                '' 
                : 
                <Media
                  src={product.attributes.img_home_768_864.data[0].attributes.url}
                  alt=""
                  className="img-fluid"
                />
              }
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <h2> {product.attributes.title} </h2>
                <h3>
                  $
                  {product.attributes.price}
                </h3>
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{product.attributes.description}</p>
                </div>
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
                      <input
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
                          onClick={() => plusQty(product)}
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
                  <button
                    className="btn btn-solid"
                    onClick={() => addCart(product, quantity)}
                  >
                    add to cart
                  </button>
                  <button
                    className="btn btn-solid"
                    onClick={clickProductDetail}
                  >
                    View detail
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductItem;
