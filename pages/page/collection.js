import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Media, Row, Col } from "reactstrap";
import {gql, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_CATS = gql`
query categories {
  categories {
    data {
      id
      attributes {
        title
        description
        products {
          data {
            id
          }
        }
        img_collection_370_370 {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`;

const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {
  return (
    <Col lg="3" md="6">
      <div className="collection-block">
        <div>
          <Media
            src={img}
            className="img-fluid blur-up lazyload bg-img"
            alt=""
            style={{borderRadius:"15px"}}
          />
        </div>
        <div className="collection-content">
          <h4>{totalProducts} Products</h4>
          <h3>{type}</h3>
          <p>{about}</p>
          <a href={`/shop/store?category=${btn}&brand=&minPrice=0&maxPrice=500`} className="btn btn-outline">
            View Products in {btn}
          </a>
        </div>
      </div>
    </Col>
  );
};

const Collection = () => {
  var { data, loading, error } = useQuery(GET_CATS)
  return (
    <CommonLayout parent="home" title="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
          <Row className="partition-collection">
            {!data || !data.categories || !data.categories.data || data.categories.data.length === 0 || loading
              ? "loading"
              : data && data.categories.data.map((data, i) => {
              return (
                <MasterCollection
                  key={i}
                  img={data.attributes.img_collection_370_370.data ? data.attributes.img_collection_370_370.data.attributes.url : ''}
                  totalProducts={data.attributes.products.data.length}
                  type={data.attributes.type}
                  about={data.attributes.description}
                  btn={data.attributes.title}
                />
              );
            })}
          </Row>
          <Row className="partition-collection section-t-space">
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Collection;
