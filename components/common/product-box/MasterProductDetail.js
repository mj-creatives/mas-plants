import React from "react";

const MasterProductDetail = ({
  product,
  productDetail,
  detailClass,
  des,
}) => {
  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
      <div className="rating"></div>
        <h6>{product.attributes.title}</h6>
        {des ? <p>{product.attributes.description}</p> : ""}
        <h4>
          $
          {product.attributes.price}
          <del>
            <span className="money">
              $
              {((product.attributes.price + (product.attributes.price * 20) / 100)).toFixed(2)}
            </span>
          </del>
        </h4>

        {product.type === "jewellery" ||
        product.type === "nursery" ||
        product.type === "beauty" ||
        product.type === "electronics" ||
        product.type === "goggles" ||
        product.type === "watch" ||
        product.type === "pets" ? (
          ""
        ) : ("")}
      </div>
    </div>
  );
};

export default MasterProductDetail;
