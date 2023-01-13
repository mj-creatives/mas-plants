import React, { useContext } from "react";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ProductItem from "../product-box/ProductBox12";
import { Row, Col, Container } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import PostLoader from "../PostLoader";

const GET_PRODUCTS = gql`
query {
  products(filters: {isNew:{eq:true}}) {
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
const TopCollection = ({
  type,
  title,
  subtitle,
  designClass,
  spanClass,
  productSlider,
}) => {
  const context = useContext(CartContext);
  const contextCompare = useContext(CompareContext);
  const quantity = context.quantity;

  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: type,
    },
  });

  return (
    <>
      <section className={designClass}>
          <Container>
            <Row>
              <Col>
                <div className="title3">
                  {subtitle ? <h4>{subtitle}</h4> : ""}
                  <h2 className="title-inner3">{title}</h2>
                  <div className="line"></div>
                </div>
                {!data ||
                !data.products ||
                !data.products.data ||
                data.products.data.length === 0 ||
                loading ? (
                  <div className="row mx-0 margin-default">
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                  </div>
                ) : (
                  <Slider
                    {...productSlider}
                    className="product-5 product-m no-arrow"
                  >
                    {data.products.data.slice(0, 4).map((product) => (
                        <div key={product.id}>
                          <ProductItem
                            product={product}
                            spanClass={spanClass}
                            addToCompare={() =>
                              contextCompare.addToCompare(product)
                            }
                            addCart={() => context.addToCart(product, quantity)}
                          />
                        </div>
                      ))}
                  </Slider>
                )}
              </Col>
            </Row>
          </Container>
      </section>
    </>
  );
};

export default TopCollection;
