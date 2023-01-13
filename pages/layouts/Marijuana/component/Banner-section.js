import React, { Fragment } from "react";
import { Container, Row, Col, Media } from "reactstrap";
import banner4 from "../../../../public/assets/images/marijuana/banner/4.jpg";
import banner2 from "../../../../public/assets/images/marijuana/banner/2.jpg";
import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client";

const Data = [
  {
    img: banner4,
    link: "#",
    classes: "p-left text-center",
  },
  {
    img: banner2,
    link: "#",
    classes: "p-right text-center",
  },
];
const GET_FEATURED_CATEGORIES = gql`
query {
  categories(pagination: { start: 0, limit: 2 }) {
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

const MasterBanner = ({ img, title, desc, link, classes }) => {
  return (
    <Col md="6">
      <a href="#">
        <div className={`collection-banner ${classes}`}>
          <div className="img-part">
            <Media
              src={img}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
              style={{borderRadius:"15px"}}
            />
          </div>
          <div className="contain-banner">
            <div>
              <h4>{title}</h4>
              <h2>{desc}</h2>
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
                link={Data[i].link}
                title={item.attributes.title}
                desc={item.attributes.description}
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
