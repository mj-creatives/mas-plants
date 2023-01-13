import React, { useContext, useState } from "react";
import { Container, Row, Col, Media, Modal, ModalBody } from "reactstrap";
import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import CartContext from "../../../helpers/cart";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { useRouter } from "next/router";

const GET_PRODUCTS = gql`
query products($id: ID!, $type: String!) {
  products(filters: {id:{ne:$id},categories:{title : { contains: $type }}},pagination: { start: 0, limit: 8 }) {
    data {
      id
      attributes {
        title
        price
        description
        isNew
        type
        available
        updatedAt
        categories {
          data {
            id
            attributes {
              title
            }
          }
        }
        sub_categories {
          data {
            id
            attributes {
              title
            }
          }
        }
        img_home_768_864 {
          data {
            attributes {
              url
            }
          }
        }
        img_shop_compare_736_1000 {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;

const ProductSection = ({productData}) => {
  const router = useRouter();
  const compareContext = useContext(CompareContext);
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx.addToCart;
  const quantity = cartCtx.quantity;
  const plusQty = cartCtx.plusQty;
  const minusQty = cartCtx.minusQty;
  const setQuantity = cartCtx.setQuantity;
  const [selectedProduct, setSelectedProduct] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = (product) => {
    const titleProps = product.attributes.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`, undefined, { shallow: true });
  };

  const getSelectedProduct = (item) => {
    setSelectedProduct(item);
    toggle();
  };

  var { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      id: productData.product.data.id,
      type: productData.product.data.attributes.categories.data[0].attributes.title,
    },
  });

  return (
    <section className="section-b-space ratio_asos">
      <Container>
        <Row>
          <Col className="product-related">
            <h2>related products</h2>
          </Col>
        </Row>
        <Row className="search-product">
          {!data ||
            !data.products ||
            data.products.data.length === 0 ||
            loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data.products.data.slice(0, 3).map((product, index) => (
                  <Col xl="2" md="4" sm="6" key={product.id}>
                    <div className="product-box">
                      <div className="img-wrapper" style={{borderRadius: "15px"}}>
                        <div className="front">
                          <a href={null}>
                          {
                            !product.attributes.img_shop_compare_736_1000.data[0] 
                            ? 
                            '' 
                            : 
                            <Media
                              onClick={() => clickProductDetail(product)}
                              src={product.attributes.img_shop_compare_736_1000.data[0].attributes.url}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          }
                          </a>
                        </div>
                        <div className="back">
                          <a href={null}>
                          {
                            !product.attributes.img_shop_compare_736_1000.data[1] 
                            ? 
                            '' 
                            :
                            <Media
                            src={product.attributes.img_shop_compare_736_1000.data[1].attributes.url}
                            className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          }
                          </a>
                        </div>
                        <div className="cart-info cart-wrap">
                          <button
                            data-toggle="modal"
                            data-target="#addtocart"
                            title="Add to cart"
                            onClick={() => addToCart(product, quantity)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </button>
                          <a
                            href="#"
                            onClick={() => getSelectedProduct(product)}
                            data-toggle="modal"
                            data-target="#quick-view"
                            title="Quick View"
                          >
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </a>
                          <a
                            href="#"
                            onClick={() => compareContext.addToCompare(product)}
                            title="Compare"
                          >
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                        </div>
                        <a href={null}>
                          <h6>{product.attributes.title}</h6>
                        </a>
                        <h4>
                          $
                          {product.attributes.price}
                        </h4>
                      </div>
                    </div>
                  </Col>
                ))}
            </>
          )}
        </Row>
        {selectedProduct ? (
          <Modal
            isOpen={modal}
            toggle={toggle}
            className="modal-lg quickview-modal"
            centered
          >
            <ModalBody>
              <Row>
                <Col lg="6" xs="12">
                  <div className="quick-view-img">
                    <Media
                      src={`${selectedProduct.attributes.images.data[0].attributes.url}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col lg="6" className="rtl-text">
                  <div className="product-right">
                    <h2> {selectedProduct.attributes.title} </h2>
                    <h3>
                      $
                      {selectedProduct.attributes.price}
                    </h3>
                    {selectedProduct.variants ? (
                      <ul className="color-variant">
                        {uniqueTags ? (
                          <ul className="color-variant">
                            {selectedProduct.type === "jewellery" ||
                              selectedProduct.type === "nursery" ||
                              selectedProduct.type === "beauty" ||
                              selectedProduct.type === "electronics" ||
                              selectedProduct.type === "goggles" ||
                              selectedProduct.type === "watch" ||
                              selectedProduct.type === "pets" ? (
                              ""
                            ) : (
                              <>
                                {uniqueTags ? (
                                  <ul className="color-variant">
                                    {uniqueTags.map((vari, i) => {
                                      return (
                                        <li
                                          className={vari.color}
                                          key={i}
                                          title={vari.color}
                                          onClick={() =>
                                            variantChangeByColor(
                                              vari.image_id,
                                              selectedProduct.images
                                            )
                                          }
                                        ></li>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                    <div className="border-product">
                      <h6 className="product-title">product details</h6>
                      <p>{selectedProduct.attributes.description}</p>
                    </div>
                    <div className="product-description border-product">
                      {selectedProduct.size ? (
                        <div className="size-box">
                          <ul>
                            {selectedProduct.size.map((size, i) => {
                              return (
                                <li key={i}>
                                  <a href={null}>{size}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
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
                              onClick={() => plusQty(selectedProduct)}
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
                        onClick={() => addToCart(selectedProduct, quantity)}
                      >
                        add to cart
                      </button>
                      <button
                        className="btn btn-solid"
                        onClick={() => clickProductDetail(selectedProduct)}
                      >
                        View detail
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        ) : (
          ""
        )}
      </Container>
    </section>
  );
};

export default ProductSection;
