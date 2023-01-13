import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Collapse } from "reactstrap";
import LogoImage from "../../headers/common/logo";
import CopyRight from "./copyright";

const MasterFooterTwo = ({
  layoutClass,
  logoName,
  footerClass,
  footerSection,
  logoImg,
  footerLogoClass,
}) => {
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth < 750;
  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener('resize', changeCollapse)
    }
  }, []);
  return (
    <Fragment>
      <footer className={footerClass}>
        <div className="dark-layout">
          <Container>
            <section className={`section-b-space ${footerSection}`}>
              <Row className="footer-theme2">
                <Col lg="5">
                  <div
                    className={`footer-title 	${
                      isOpen && collapse == 1 ? "active" : ""
                    }  footer-mobile-title`}
                  >
                    <h4
                      onClick={() => {
                        setCollapse(1);
                        setIsOpen(!isOpen);
                      }}
                    >
                      about
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <div className={`footer-logo ${footerLogoClass}`}>
                        {logoImg ? (
                          <LogoImage logo={logoName} />
                        ) : (
                          <img src={logoName.src} alt="" />
                        )}
                      </div>
                      <p>
                      A bunch of houseplant lovers just like you. We are here for you every step of your houseplant journey, from our store to your home. We aim to inspire and create a retreat from the urban setting, rooted in the belief that plant care is self-care.
                      </p>
                    </div>
                  </Collapse>
                </Col>
                <Col lg="2" className="subscribe-wrapper">
                </Col>
                <Col lg="5">
                  <div
                    className={`footer-title 	${
                      isOpen && collapse == 2 ? "active" : ""
                    } `}
                  >
                    <h4
                      onClick={() => {
                        setCollapse(2);
                        setIsOpen(!isOpen);
                      }}
                    >
                      store information
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul className="contact-details">
                        <li>MasPlants</li>
                      </ul>
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
        <CopyRight layout={layoutClass ? layoutClass : ""} />
      </footer>
    </Fragment>
  );
};

export default MasterFooterTwo;
