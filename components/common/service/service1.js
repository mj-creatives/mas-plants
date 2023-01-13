import React from "react";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
  svgUser
} from "../../../services/script";
import { Container, Row, Col } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";

const Data = [
  {
    link: svgFreeShipping,
    title: "free standard shipping",
    service: "Enjoy free domestic shipping.",
  },
  {
    link: svgservice,
    title: "24 X 7 service",
    service: "online service for 24 x 7",
  },
  {
    link: svgUser,
    title: "About Us",
    service: "women-owned, small business in Washington DC. ",
  },
];

const ServiceLayout = ({ sectionClass }) => {
  return (
    <Container>
      <section className={sectionClass}>
        <Row>
          {Data.map((data, index) => {
            return (
              <Col md="4" className="service-block" key={index}>
                <MasterServiceContent
                  link={data.link}
                  title={data.title}
                  service={data.service}
                />
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};

export default ServiceLayout;
