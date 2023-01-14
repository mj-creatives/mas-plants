import React, { Fragment } from "react";
import { Container, Row, Col, Media } from "reactstrap";
import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client";

const Data = [
  {
    link: "#",
    classes: "p-left text-center",
  },
  {
    link: "#",
    classes: "p-right text-center",
  },
];
const GET_FEATURED_CATEGORIES = gql`
query {
  categories(filters:{title:{ne:"All"}},pagination: { start: 0, limit: 2 }) {
    data {
      id
      attributes {
        title
        description
        img_home_672_249 {
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

const MasterBanner = ({ img, title, link, classes }) => {
  return (
    <Col md="6">
      <a href={link}>
        <div className={`collection-banner ${classes}`}>
          <div className="img-part">
            <Media
              style={{borderRadius:"15px"}}
              className="img-fluid blur-up lazyload bg-img"
              src={img}
            />
          </div>
          <div className="contain-banner text-center row g-0" style={{backgroundColor:"rgba(0,0,0,0.4)",borderRadius:"15px"}}>
            <div>
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </a>
    </Col>
  );
};

const BannerSection = () => {
  var { data, loading, error  } = useQuery(GET_FEATURED_CATEGORIES);
  return(
  <Fragment>
    <section className="p-t-0 section-b-space ratio_45">
      <Container>
        <Row className="partition2">
          {data && data.categories.data.map((item, i) => {
            return (
              <MasterBanner
                key={item.id}
                img={item.attributes.img_home_672_249.data.attributes.url}
                link={`/shop/store?category=${item.attributes.title}&type=&minPrice=0&maxPrice=1000`}
                title={item.attributes.title}
                classes={Data[i].classes}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  </Fragment>
)};
export default BannerSection;
