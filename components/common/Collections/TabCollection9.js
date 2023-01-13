import React, { useState, useContext } from "react";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import { Col, Container, Row } from "reactstrap";
import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import Slider from "react-slick";
import ProductItem from "../product-box/ProductBox12";
import CartContext from "../../../helpers/cart/index";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { Product3 } from "../../../services/script";
import PostLoader from "../PostLoader";
import Background from "../../../public/assets/images/parallax/23.jpg";

const GET_PRODUCTS = gql`
query fullQuery($type:String!){
  categories {
    data {
      id
      attributes {
        title
      }
    }
  }
  products(filters:{categories:{title:{eq:$type}}},pagination:{limit:26,start:0}) {
    data {
      id
      attributes {
        title
        categories {
          data {
            attributes {
              title
            }
          }
        }
      }
    }
  }
}
`;

const TabContent = ({
  data,
  loading,
  cartClass,
  spanClass,
}) => {
  const context = useContext(CartContext);
  const contextCompare = useContext(CompareContext);
  const quatity = context.quatity;
  return (
    <div>
      {!data ||
      !data.products ||
      !data.products.items ||
      data.products.items.length === 0 ||
      loading ? (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      ) : (
        <Slider {...Product3} className="product-3 product-m no-arrow">
          {data &&
            data.products.items
              .slice(startIndex, endIndex)
              .map((product, index) => (
                <ProductItem
                  product={product}
                  spanClass={spanClass}
                  addToCompare={() => contextCompare.addToCompare(product)}
                  addCart={() => context.addToCart(product, quatity)}
                  key={index}
                  cartclassName={cartClass}
                />
              ))}
        </Slider>
      )}
    </div>
  );
};

const TabCollection = ({ cartClass, spanClass }) => {
  const [activeTab, setActiveTab] = useState("All");
  console.log(activeTab)
  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: activeTab,
    },
  });

  return (
    <>
      <section
        className="full-banner parallax tools-parallax-product tab-left ratio_square tools-grey border-box bg-size blur-up lazyloaded"
        style={{ backgroundImage: "url(" + Background + ")" }}
      >
        <Container>
          <Row>
            <Col>
              <Tabs className="theme-tab">
                <div className="left-side">
                  <div className="left-tab-title">
                    <h4>our shop</h4>
                    <h3>Buy Marijuana</h3>
                  </div>
                  <TabList className="tabs tab-title">
                  {!data || !data.categories || !data.categories.data || data.categories.data.length === 0 || loading
                    ? "loading"
                    : data && data.categories.data.map((data, i) => {
                    return (
                    <Tab
                    key={i}
                    className={activeTab == data.attributes.title ? "active" : ""}
                    onClick={() => setActiveTab(data.attributes.title)}
                    >
                      <a href={null}>{data.attributes.title}</a>
                    </Tab>
                      );
                    })}
                  </TabList>
                </div>
                <div className="tab-content-cls">
                  <TabPanel className="tab-content active default">
                    <TabContent
                      data={data}
                      loading={loading}
                      cartClass={cartClass}
                      spanClass={spanClass}
                    />
                  </TabPanel>
                  <TabPanel className="tab-content">
                    <TabContent
                      data={data}
                      loading={loading}
                      cartClass={cartClass}
                      spanClass={spanClass}
                    />
                  </TabPanel>
                  <TabPanel className="tab-content">
                    <TabContent
                      data={data}
                      loading={loading}
                      cartClass={cartClass}
                      spanClass={spanClass}
                    />
                  </TabPanel>
                </div>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TabCollection;
