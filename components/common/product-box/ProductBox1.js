import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody } from "reactstrap";
import CartContext from "../../../helpers/cart";
import MasterProductDetail from "./MasterProductDetail";

const ProductItem = ({
  product,
  addCart,
  backImage,
  des,
  cartClass,
  productDetail,
  addCompare,
  title,
}) => {
  // eslint-disable-next-line
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;

  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const onClickHandle = (img) => {
    setImage(img);
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = () => {
    const titleProps = product.attributes.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`);
  };

  const variantChangeByColor = (imgId, product_images) => {
    product_images.map((data) => {
      if (data.image_id == imgId) {
        setImage(data.src);
      }
    });
  };
  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.attributes.isNew === true ? <span className="lable3">new</span> : ""}
          {product.sale === true ? <span className="lable4">on sale</span> : ""}
        </div>
        <div className="front" onClick={clickProductDetail}>
        {
          !product.attributes.img_shop_compare_736_1000.data[0] 
          ? 
          '' 
          :
          <Media
            src={product.attributes.img_shop_compare_736_1000.data[0].attributes.url}
            className="img-fluid"
            alt=""
          />
        }
        </div>
        {backImage ? (
          product.attributes.images.data[1] === "undefined" ? (
            "false"
          ) : (
            <div className="back" onClick={clickProductDetail}>
              <Media
                src={`${image ? image : product.attributes.images.data[1].attributes.url}`}
                className="img-fluid m-auto"
                alt=""
              />
            </div>
          )
        ) : (
          ""
        )}

        <div className={cartClass}>
          <button title="Add to cart" onClick={addCart}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
          <a href={null} title="Quick View" onClick={toggle}>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </a>
          <a href={null} title="Compare" onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
          <Modal
            isOpen={modalCompare}
            toggle={toggleCompare}
            size="lg"
            centered
          >
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                  {
                      !product.attributes.img_shop_compare_736_1000.data[0] 
                      ? 
                      '' 
                      :
                      <Media
                      src={`${
                        product.variants && image
                          ? image
                          : product.attributes.img_shop_compare_736_1000.data[0].attributes.url
                      }`}
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
                        onClick={addCompare}
                        style={{borderRadius: "15px"}}
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
        {product.attributes.img_shop_compare_736_1000.data ? (
          <ul className="product-thumb-list">
            {product.attributes.img_shop_compare_736_1000.data.map((img, i) => (
              <li
                className={`grid_thumb_img ${
                  img.attributes.url === image ? "active" : ""
                }`}
                key={i}
              >
                <a href={null} title="Change Img">
                  <Media
                    src={`${img.attributes.url}`}
                    alt="product image"
                    onClick={() => onClickHandle(img.attributes.url)}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail
        product={product}
        productDetail={productDetail}
        uniqueTags={uniqueTags}
        title={title}
        des={des}
        variantChangeByColor={variantChangeByColor}
      />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-lg quickview-modal"
        centered
      >
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
            {
              !product.attributes.img_shop_compare_736_1000.data[0] 
              ? 
              '' 
              :
              <div className="quick-view-img">
                <Media
                  src={`${
                    product.variants && image ? image : product.attributes.img_shop_compare_736_1000.data[0].attributes.url
                  }`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            }
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
                    onClick={() => addCart(product)}
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
