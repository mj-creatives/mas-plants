import React from "react";
import visa from "../../../public/assets/images/icon/visa.png";
import mastercard from "../../../public/assets/images/icon/mastercard.png";
import paypal from "../../../public/assets/images/icon/paypal.png";
import express from "../../../public/assets/images/icon/american-express.png";
import discover from "../../../public/assets/images/icon/discover.png";
import { Media } from "reactstrap";
import { 
  FacebookShareButton, 
  FacebookIcon, 
  TwitterShareButton, 
  TwitterIcon,
  InstapaperIcon, 
  InstapaperShareButton, 
  EmailShareButton,
  EmailIcon, } from 'react-share';

const PaymentData = [
  { img: visa, link: "#" },
  { img: mastercard, link: "#" },
  { img: paypal, link: "#" },
  { img: express, link: "#" },
  { img: discover, link: "#" },
];


const Detail = ({ item }) => {
  var rebels = (
    item.product.data.attributes ? 
    item.product.data.attributes.categories.data.filter(function (pilot) {
      return pilot.attributes.title !== "All";
    })
    :
    ''
    )
  return (
    <div className="product-right product-description-box">
      <h2>{item.product.data.attributes.title}</h2>
      <div className="border-product">
        <h6 className="product-title">product details</h6>
        <p>{item.product.data.attributes.description}</p>
      </div>
      <div className="single-product-tables border-product detail-section">
        <table>
          <tbody>
            <tr>
              <td>Status :</td>
              <td>{item.product.data.attributes.type}</td>
            </tr>
            <tr>
              <td>Categories :</td>
              <td>
              {rebels.map((category) => {
                return category.attributes.title + " , ";
              })}
              </td>
            </tr>
            <tr>
              <td>Sub Categories :</td>
              <td>
              {item.product.data.attributes.sub_categories.data.map((sub_category) => {
                return sub_category.attributes.title + " , ";
              })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border-product">
        <h6 className="product-title">Share It</h6>
        <div className="product-icon">
          <form className="d-inline-block">
          <FacebookShareButton 
        url={window.location.href}
        quote={'Dummy text!'}
        hashtag="#muo"
        >
        <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={window.location.href}
          quote={'Dummy text!'}
          hashtag="#muo"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton
          url={window.location.href}
          quote={'Dummy text!'}
          hashtag="#muo"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
          </form>
        </div>
      </div>
      <div className="border-product">
        <h6 className="product-title">100% SECURE PAYMENT</h6>
        <div className="payment-card-bottom">
          <ul>
            {PaymentData.map((data, index) => {
              return (
                <li key={index}>
                  <a href={data.link}>
                    <Media src={data.img.src} alt="" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
