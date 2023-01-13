import React, { Fragment } from 'react';
import { Container, Row ,Col } from 'reactstrap';

const AboutUs = () => (
    <Fragment>
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="offset-lg-2">
                        <div className="title3">
                            <h4>about us</h4>
                            <h2 className="title-inner3">welcome to mas plants</h2>
                            <div className="line"></div>
                        </div>
                        <div className="about-text">
                            <p>We are on a Mission to inspire a more personal connection to the natural world, maintaining the belief that caring for plants is a deep form of self-care. We are invested in your growth as a plant owner and are here to help demystify plant care. Our experienced staff matched with our unbeatable selection are sure to find the perfect houseplants for your space. We hope to assist in creating a sense of retreat from the urban setting both in our retail shops and in your home!</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Fragment>
)

export default AboutUs;