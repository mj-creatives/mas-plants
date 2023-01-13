import React, { useContext } from 'react';
import CommonLayout from "../../components/shop/common-layout";
import { Slider4 } from "../../services/script";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import { CompareContext } from '../../helpers/Compare/CompareContext';
import CartContext from "../../helpers/cart";

const CompareItems = ({
  img,
  title,
  price,
  desc,
  categories,
  type,
  isNew,
  available,
  removeFromComapre,
  addToCart
}) => {
  return (
    <div>
      <div className="compare-part">
        <button type="button" className="close-btn" onClick={removeFromComapre}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="img-secton">
          <div>
            <img
              src={img}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <a href="#">
            <h5>{title}</h5>
          </a>
          <h5>{price}</h5>
        </div>
        <div className="detail-part">
          <div className="title-detail">
            <h5>description</h5>
          </div>
          <div className="inner-detail">
            <p>{desc}</p>
          </div>
        </div>
        <div className="detail-part">
          <div className="title-detail">
            <h5>Feature</h5>
          </div>
          <div className="inner-detail">
            <p>{type}</p>
          </div>
        </div>
        <div className="detail-part">
          <div className="title-detail">
            <h5>Categories</h5>
          </div>
          <div className="inner-detail">
            <p>
              {categories.data.map((sizeData) => {
                return sizeData.attributes.title + " , ";
              })}
            </p>
          </div>
        </div>
        <div className="detail-part">
          <div className="title-detail">
            <h5>Is It New?</h5>
          </div>
          <div className="inner-detail">
            <p>{isNew ? "New Product" : ""}</p>
          </div>
        </div>
        <div className="detail-part">
          <div className="title-detail">
            <h5>availability</h5>
          </div>
          <div className="inner-detail">
            <p>{available ? "Product is available" : "Product is not available"}</p>
          </div>
        </div>
        <div className="btn-part">
          <button type="button" className="btn btn-solid" onClick={addToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

const CompareTwo = () => {
  const contextCompare = useContext(CompareContext);
  const compareItem = contextCompare.compareItems;
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx.addToCart;
  return (
    <CommonLayout parent="home" title="compare-2">
      <section className="compare-section section-b-space ratio_asos" >
        <Container >
          <Row >
            <Col >
              <Slider {...Slider4}>
                {compareItem.map((data, i) => {
                  return (
                    <CompareItems
                      key={i}
                      img={data.attributes.img_shop_compare_736_1000.data[0].attributes.url}
                      title={data.attributes.title}
                      price={data.attributes.price}
                      desc={data.attributes.description}
                      categories={data.attributes.categories}
                      type={data.attributes.type}
                      isNew={data.attributes.isNew}
                      available={data.attributes.available}
                      data={data}
                      removeFromComapre={() =>
                        contextCompare.removeFromComapre(data)
                      }
                      addToCart={() => addToCart(data, 1)}
                    />
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default CompareTwo;
