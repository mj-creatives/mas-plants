import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import aboutus from "../../public/assets/images/about/about-us.jpg";
import ServiceLayout from "../../components/common/service/service1";

const AboutUs = () => {
  return (
    <>
      <CommonLayout parent="home" title="About-us">
        {/* // <!-- about section start --> */}
        <section className="about-page section-b-space">
          <Container>
            <Row>
              <Col lg="12">
                <div className="banner-section">
                  <Media
                    src={aboutus.src}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                </div>
              </Col>
              <Col sm="12">
                <h4>
                Everyone Should Live with a Little More Green
                </h4>
                <p>
                Mas Plants is here to help strengthen your relationship with plants. We make buying plants easy by delivering healthy, ready-to-go plants to your door and setting you up with the tips and tricks you need to help your plants thrive. Plants make life better. We make plants easy.
                </p>
                <p>
                When you buy a houseplant from a box store or nursery, it probably spends an average of four weeks traveling from a greenhouse to a drafty warehouse on a hot or cold truck. Then, it’s shipped to a store where it likely isn’t getting the water, light, or care it needs to thrive. With Mas Plants, our plants are cared for by plant experts and kept in optimal conditions at our greenhouse where they’re shipped directly to you or readily made available to be picked up. So instead of your plant spending 4 weeks in an uncontrolled environment, it spends 3-4 days going from our greenhouse to your front door or to our store. This means your plants arrive healthy and already thriving.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="section-b-space">
          <ServiceLayout
            sectionClass={"service border-section small-section"}
          />
        </div>
      </CommonLayout>
    </>
  );
};

export default AboutUs;
