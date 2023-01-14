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


const Collection = () => {
  var { data, loading, error } = useQuery(GET_CATS)

  const createItemList = () => {
    let rows = {}
    let counter = 1
    if(data && data.categories && data.categories.data){
      data.categories.data.forEach((item, idx) => {
        rows[counter] = rows[counter] ? [...rows[counter]] : []
        if (idx % 3 === 0 && idx !== 0) {
          counter++
          rows[counter] = rows[counter] ? [...rows[counter]] : []
          rows[counter].push(item)
        } else {
          rows[counter].push(item)
        }
      })
      return rows
    }
  }
  let rows = createItemList()
  return (
    <CommonLayout parent="home" title="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
        {!data ||
          !data.categories ||
          !data.categories.data ||
          data.categories.data.length === 0 ||
          loading ? 
          'loading...' 
          :
            <>
                {Object.keys(rows).map(row => {
                  return (
                    <div key={row}>
                    <Row className="partition-collection">
                      {rows[row].map(item => {
                        return (
                          <Col lg="4" md="6" key={item.id}>
                          <div className="collection-block">
                            <div>
                              <Media
                                src={item.attributes.img_collection_370_370.data ? item.attributes.img_collection_370_370.data.attributes.url : ''}
                                className="img-fluid blur-up lazyload bg-img col-12"
                                alt=""
                                style={{borderRadius:"15px"}}
                              />
                            </div>
                            <div className="collection-content d-flex flex-column">
                              <h3>{item.attributes.title}</h3>
                              <h4>{item.attributes.products.data.length} Products</h4>
                              <h3>{item.attributes.type}</h3>
                              <p style={{marginBottom:"4rem"}}>{item.attributes.description}</p>
                              <a 
                              href={`/shop/store?category=${item.attributes.title}&type=&minPrice=0&maxPrice=1000`} 
                              className="btn btn-outline mt-auto"
                              style={{bottom:0,position:"absolute",left:1,right:1}}
                              >
                                View Products in {item.attributes.title}
                              </a>
                            </div>
                          </div>
                        </Col>
                        )
                      })}
                    </Row>
                    <Row className="partition-collection section-t-space">
                    </Row>
                    </div>
                  )
                })}
              </>
          }
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Collection;
