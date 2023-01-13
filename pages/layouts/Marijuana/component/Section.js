import React from "react";
import { Container, Row, Col } from "reactstrap";
import { svgLeaf, svgFreeShipping, svgUser, svgPickUp, svgApproach } from "../../../../services/script";

const Data = [
  {
    img: svgFreeShipping,
    title: "Free Standard Shipping",
    desc:
      "Enjoy free standard shipping on all plants and planters. Orders are shipped via UPS carbon neutral shipping, keeping our carbon footprint as small as possible.",
  },
  {
    img: svgUser,
    title: "About the Owner",
    desc:
      "Mas Plants is a women-owned, small business in Washington DC.  Noemi Wilson, the owner and creative director hopes that plants can bring beauty, joy, and ritual into your spaces to improve your life. She believes plants should be a fun hobby, not just an accessory, and so Mas Plants was created.",
  },
  {
    img: svgPickUp,
    title: "Returns",
    desc:
      "All plant sales are Final. Returns on non-plant merchandise are accepted on unused products for 14 days.",
  },
];

const MasterSection = ({ img, title, desc }) => {
  return (
    <Col md="4">
      <div className="detail_section">
        <div style={{borderRadius:"15px"}}>
          <div dangerouslySetInnerHTML={{ __html: img }}></div>
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>
    </Col>
  );
};

const Sections = () => (
  <section className="section-b-space detail-cannabis bg-grey" >
    <Container>
      <Row>
        {Data.map((data, i) => {
          return (
            <MasterSection
              key={i}
              img={data.img}
              title={data.title}
              desc={data.desc}
            />
          );
        })}
      </Row>
    </Container>
  </section>
);

export default Sections;
