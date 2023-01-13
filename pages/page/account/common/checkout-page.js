import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import { loadStripe } from "@stripe/stripe-js";
import CustomerForm from "./customerForm";
import { makeRequest } from "../../../../helpers/makeRequest";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const [shippingOption, setShippingOption] = useState("local-pickup")
  const [customerInfo, setCustomerInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    country: "United States",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  });

  const onShippingOptionChange = e => {
    setShippingOption(e.target.value)
  }

  const onCustomerInfoChange = (event) => {
    setCustomerInfo({ ...customerInfo, [event.target.name]: event.target.value });
  };

  const onShippingInfoChange = (event) => {
    setShippingInfo({ ...shippingInfo, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const handlePayment = async () => {
    try {
          console.log("These are cartItems: ",cartItems)
          const stripe = await stripePromise;
          console.log(stripe)
          const products = cartItems.map(({
            id,
            attributes,
            qty
          }) => ({
            id: parseInt(id),
            title: attributes.title,
            price: attributes.price,
            img: [attributes.img_shop_compare_736_1000.data[0].attributes.url],
            quantity: qty
          }))
          console.log("NEW CART ITEMS: ",products)
          const res = await makeRequest.post("/orders", {
            products,
            shippingOption,
            customerInfo, 
            shippingInfo
          });
          await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
          });
          console.log(res)
    }catch (err) {
      console.log(err);
    }
  }
  const validateForms = async () => {
      if (
        customerInfo.fname != '' &&
        customerInfo.lname != '' &&
        customerInfo.email != ''
        ){
          if (shippingOption === 'free-shipping') {
            if (
              shippingInfo.country != '' &&
              shippingInfo.address != '' &&
              shippingInfo.city != '' &&
              shippingInfo.zip != '' &&
              shippingInfo.state != ''
            ){
              handlePayment()
            }else{
              toast.error("Please Fill Shipping Info or select Local Pickup")
            }
          }else{
            handlePayment()
          }
        }else{
          toast.error("Please Fill Required Fields");
      }
  };

  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <div>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Billing Details</h3>
                  </div>
                  <div className="row check-out">
                  <div className="form-group col-md-6 col-sm-6 col-xs-12">
                    <div className="field-label">First Name</div>
                    <input
                      style={{borderRadius:"10px"}}
                      type="text"
                      value={customerInfo.fname}
                      name="fname"
                      onChange={onCustomerInfoChange}
                    />
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-xs-12">
                    <div className="field-label">Last Name</div>
                    <input
                      style={{borderRadius:"10px"}}
                      type="text"
                      value={customerInfo.lname}
                      name="lname"
                      onChange={onCustomerInfoChange}
                    />
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-xs-12">
                    <div className="field-label">Phone</div>
                    <input
                      style={{borderRadius:"10px"}}
                      type="tel"
                      name="phonenumber"
                      value={customerInfo.phonenumber}
                      onChange={onCustomerInfoChange}
                    />
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-xs-12">
                    <div className="field-label">Email Address</div>
                    <input
                      style={{borderRadius:"10px"}}
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={onCustomerInfoChange}
                    />
                  </div>
                  {shippingOption === 'free-shipping' ? <CustomerForm shippingInfo={shippingInfo} onShippingInfoChange={onShippingInfoChange}/> : ''}
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details" style={{borderRadius:"10px"}}>
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Product <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>
                              {item.title} × {item.qty}{" "}
                              <span>
                                $
                                {item.total}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              $
                              {cartTotal}
                            </span>
                          </li>
                          <li>
                            Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input
                                  type="radio"
                                  name="deliverorpickup"
                                  id="free-shipping"
                                  value="free-shipping"
                                  checked={shippingOption === "free-shipping"}
                                  onChange={onShippingOptionChange}
                                />
                                <label htmlFor="free-shipping">
                                  Free Shipping
                                </label>
                              </div>
                              <div className="shopping-option">
                                <input
                                  type="radio"
                                  name="deliverorpickup"
                                  id="local-pickup"
                                  value="local-pickup"
                                  checked={shippingOption === "local-pickup"}
                                  onChange={onShippingOptionChange}
                                />
                                <label htmlFor="local-pickup">
                                  Local Pickup
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                          </li>
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              $
                              {cartTotal}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                        </div>
                        {cartTotal !== 0 ? (
                          <div className="text-end">
                            <button onClick={validateForms} className="btn-solid btn">
                                Proceed To Checkout
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
