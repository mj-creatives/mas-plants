import React, { useContext, useState, useRef, useEffect } from "react";
import { Container, Row, Col, Media } from "reactstrap";
import Slider from "react-slick";
import {gql, useQuery } from "@apollo/client";
import ImageZoom from "../common/image-zoom";
import DetailBox from "../common/detail-box";
import Detail from "../common/detailPage";

const GET_SINGLE_PRODUCTS = gql`
query product($id: ID!) {
  product(id:$id) {
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
const ThreeColLeftPage = ({ pathId }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: pathId,
    },
  });
  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    vertical: true,
    focusOnSelect: true,
    infinite: false,
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);
  const { nav1, nav2 } = state;

  return (
    <section>
      <div className="collection-wrapper">
        <Container>
          {!data || !data.product.data || data.product.data.length === 0 || loading ? (
            "loading"
          ) : (
            <Row>
              <Col lg="1" sm="2" xs="12" className="p-0 pb-cls-slider">
                <Slider
                  className="slider-nav"
                  {...productsnav}
                  asNavFor={nav1}
                  ref={(slider) => (slider2.current = slider)}
                >
                  {data.product.data.attributes.img_shop_compare_736_1000.data.map((vari, index) => (
                        <div key={vari.id}>
                          <Media
                            src={`${vari.attributes.url}`}
                            key={vari.id}
                            className="img-fluid"
                          />
                        </div>
                      ))}
                </Slider>
              </Col>
              <Col lg="3" sm="10" xs="12" className="order-up">
                <Row>
                  <Col>
                    <Slider
                      {...products}
                      asNavFor={nav2}
                      ref={(slider) => (slider1.current = slider)}
                      className="product-right-slick"
                    >
                      {data.product.variants
                        ? data.product.data.attributes.img_shop_compare_736_1000.data.map((vari, index) => (
                            <div key={vari.id}>
                              <ImageZoom image={vari} />
                            </div>
                          ))
                        : data.product.data.attributes.img_shop_compare_736_1000.data.map((vari, index) => (
                            <div key={vari.id}>
                              <ImageZoom image={vari} />
                            </div>
                          ))}
                    </Slider>
                  </Col>
                </Row>
              </Col>
              <Col lg="4">
                <Detail item={data} />
              </Col>
              <Col lg="4">
                <DetailBox
                  item={data}
                  changeColorVar={changeColorVar}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </section>
  );
};

export default ThreeColLeftPage;
