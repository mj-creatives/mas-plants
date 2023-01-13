import React from "react";
import { Container, Row, Col } from "reactstrap";

const TopBarDark = ({ topClass, fluid }) => {
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to MasPlants</li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
