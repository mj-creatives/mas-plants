import React, { useContext } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col, Media } from 'reactstrap';
import CartContext from '../../helpers/cart';

const OrderSuccess = () => {
    const cartContext = useContext(CartContext);
    const cartItems = cartContext.state;
    const cartTotal = cartContext.cartTotal;
    //Current date
    var currentDate = new Date();

    //here 2 is day increament for the date and you can use -2 for decreament day
    currentDate.setDate(currentDate.getDate() +parseInt(7));

    //formatting date by mm/dd/yyyy
    var dateInmmddyyyy = currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

    return (
        <CommonLayout parent="home" title="order success">
            <section className="section-b-space light-layout white-1">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                <h2>thank you</h2>
                                <p>Payment is successfully processsed and your order is on the way</p>
                                <p>Transaction ID:267676GHERT105467</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="product-order">
                                <h3>your order details</h3>

                                {cartItems.map((item, i) =>
                                    <Row className="product-order-detail" key={i}>
                                        <Col xs="3" >
                                            <Media src={item.attributes.img_shop_compare_736_1000.data[0].attributes.url} alt=""
                                                className="img-fluid blur-up lazyload" />
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>product name</h4>
                                                <h5>{item.attributes.title}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>quantity</h4>
                                                <h5>{item.qty}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>price</h4>
                                                <h5>${item.attributes.price}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                <div className="total-sec">
                                    <ul>
                                        <li>subtotal <span>${cartTotal}</span></li>
                                    </ul>
                                </div>
                                <div className="final-total">
                                    <h3>total <span>${cartTotal}</span></h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <Row className="order-success-sec">
                                <Col sm="6">
                                    <h4>summery</h4>
                                    <ul className="order-detail">
                                        <li>order ID: 5563853658932</li>
                                        <li>Order Date: October 22, 2022</li>
                                        <li>Order Total: $907.28</li>
                                    </ul>
                                </Col>
                                <Col sm="6">
                                    <h4>shipping address</h4>
                                    <ul className="order-detail">
                                        <li>gerg harvell</li>
                                        <li>568, suite ave.</li>
                                        <li>Austrlia, 235153</li>
                                        <li>Contact No. 987456321</li>
                                    </ul>
                                </Col>
                                <Col sm="12" className="payment-mode">
                                    <h4>payment method</h4>
                                    <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking
                                acceptance subject to device availability.</p>
                                </Col>
                                <Col md="12">
                                    <div className="delivery-sec">
                                        <h3>available on: </h3>
                                        <h2>{dateInmmddyyyy}</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default OrderSuccess;