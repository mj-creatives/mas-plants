import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Media } from "reactstrap";
import Slider from "react-slick";

const GET_PRODUCTS = gql`
query {
  products(filters: {isNew:{eq:true}}) {
    data {
      id
      attributes {
        title
        price
        img_home_768_864 {
          data {
            attributes {
              url
            }
          }
        }
        img_shop_compare_736_1000 {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`;

const NewProduct = () => {
  var { loading, data } = useQuery(GET_PRODUCTS);

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">new products</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!data ||
          !data.products ||
          data.products.length === 0 ||
          loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data.products.data.slice(0, 3).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                    {
                      !product.attributes.img_shop_compare_736_1000.data[0] 
                      ? 
                      '' 
                      :
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.attributes.img_shop_compare_736_1000.data[0].attributes.url}
                      />
                    }
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                      </div>
                      <a href={null}>
                        <h6>{product.attributes.title}</h6>
                      </a>
                      <h4>
                        $
                        {product.attributes.price}
                      </h4>
                      <br />
                      <del>
                      <span className="money">
                        $
                        {((product.attributes.price + (product.attributes.price * 20) / 100)).toFixed(2)}
                      </span>
                    </del>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!data ||
          !data.products ||
          data.products.length === 0 ||
          loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data.products.data.slice(4, 7).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                    {
                      !product.attributes.img_shop_compare_736_1000.data[0] 
                      ? 
                      '' 
                      :
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.attributes.img_shop_compare_736_1000.data[0].attributes.url}
                      />
                    }
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                      </div>
                      <a href={null}>
                        <h6>{product.attributes.title}</h6>
                      </a>
                      <h4>
                        $
                        {product.attributes.price}
                      </h4>
                      <br />
                      <del>
                      <span className="money">
                        $
                        {((product.attributes.price + (product.attributes.price * 20) / 100)).toFixed(2)}
                      </span>
                    </del>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
