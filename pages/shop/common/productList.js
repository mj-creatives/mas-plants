import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import FilterContext from "../../../helpers/filter/FilterContext";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import { useRouter } from "next/router";
import PostLoader from "../../../components/common/PostLoader";
import CartContext from "../../../helpers/cart";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import Paginate from "./pagination";
const GET_PRODUCTS = gql`
query products(
  $type: String!
  $indexFrom: Int!
  $limit: Int!
  $priceMax: Float!
  $priceMin: Float!
  $sortBy: [String!]
  $brand: [String!]
){
products(filters: { categories:{title : { eq: $type }},price: { gte: $priceMin,lte: $priceMax },sub_categories:{title: {in: $brand}}},pagination: { page: $indexFrom, pageSize: $limit },sort: $sortBy) {
  data {
    id
    attributes {
      title
      price
      description
      isNew
      type
      available
      updatedAt
      categories {
        data {
          id
          attributes {
            title
          }
        }
      }
      sub_categories {
        data {
          id
          attributes {
            title
          }
        }
      }
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
  meta {
    pagination {
      total
      page
      pageSize
      pageCount
    }
  }
}
}`
;

const ProductList = ({ colClass, layoutList, openSidebar, noSidebar, catDesc, catImg }) => {
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const compareContext = useContext(CompareContext);
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [grid, setGrid] = useState(colClass);
  const filterContext = useContext(FilterContext);
  const selectedBrands = filterContext.selectedBrands;
  const selectedPrice = filterContext.selectedPrice;
  const selectedCategory = filterContext.state;
  const setSubCategoriesState = filterContext.setSubCategories;
  const [sortBy, setSortBy] = useState("updatedAt:desc");
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const pathname = window.location.pathname;
    setUrl(pathname);
    router.push(
      `${pathname}?category=${selectedCategory}&type=${selectedBrands}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`, undefined, { shallow: true }
    );
  }, [selectedBrands, selectedPrice, selectedCategory]);
  const QUERY1 = {
      type: selectedCategory,
      priceMax: selectedPrice.max,
      priceMin: selectedPrice.min,
      sortBy: sortBy,
      indexFrom: currentPage,
      limit: limit,
  }
  const QUERY2 = {
    type: selectedCategory,
    priceMax: selectedPrice.max,
    priceMin: selectedPrice.min,
    brand: selectedBrands,
    sortBy: sortBy,
    indexFrom: currentPage,
    limit: limit,
}
  var QUERY = selectedBrands.length === 0 ? QUERY1 : QUERY2;
  var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: QUERY
  });
  useEffect(() => {
    if (data) {
      const productIds = data.products.data.map(item => {
        return item.id;
      })
      setSubCategoriesState(productIds)
    }
  },[selectedPrice,selectedCategory,data])
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
 };
 const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (data.products.meta.pagination.page !== Math.ceil(data.products.meta.pagination.total / limit)) {
      setCurrentPage(data.products.meta.pagination.page + 1);
    }
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    filterContext.setSelectedBrands(temp);
  };
  
  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <a href={null}>
              {!catImg ? '' 
              : <Media
                  src={catImg}
                  className="img-fluid blur-up lazyload"
                  alt=""
                  style={{borderRadius:"15px"}}
                />
              }
              </a>
              <div className="top-banner-content small-section">
                <h4>{selectedCategory}</h4>
                <p>
                  {catDesc}
                </p>
              </div>
            </div>
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags">
                  {selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {
                    <li>
                      <a href={null} className="filter_tag">
                        price: {selectedPrice.min}- {selectedPrice.max}
                      </a>
                    </li>
                  }
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="filter-main-btn"
                        onClick={() => openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {data
                            ? `Showing 1-${data.products.data.length} of ${data.products.meta.pagination.total}`
                            : "loading"}{" "}
                          Results
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { visibility: "hidden" }
                            : { visibility: "visible" }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="10">10 Products Per Page</option>
                          <option value="15">15 Products Per Page</option>
                          <option value="20">20 Products Per Page</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select onChange={(e) => setSortBy(e.target.value)}>
                          <option value="updatedAt:desc">Newest</option>
                          <option value="price:desc">Price High To Low</option>
                          <option value="price:asc">Price Low To High</option>
                          <option value="title:desc">Z- A</option>
                          <option value="title:asc">A - Z</option>
                          <option value={["title:asc", "price:asc"]}>A - Z & Price Low To High</option>
                          <option value={["title:desc", "price:desc"]}>Z - A & Price High To Low</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!data ||
                    !data.products ||
                    !data.products.data ||
                    data.products.data.length === 0 ||
                    loading ? (
                    data &&
                      data.products &&
                      data.products.data &&
                      data.products.data.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Looks like no items were found</strong>
                            </h3>
                            <h4>Change filters to find more items.</h4>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                      </div>
                    )
                  ) : (
                    data &&
                    data.products.data.map((product) => (
                      <div className={grid} key={product.id}>
                        <div className="product">
                          <div>
                            <ProductItem
                              des={true}
                              product={product}
                              cartClass="cart-info cart-wrap"
                              addCompare={() =>
                                compareContext.addToCompare(product)
                              }
                              addCart={() =>
                                cartContext.addToCart(product, quantity)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              <div className="section-t-space">
                <div className="text-center">
                {!data ? (
                      <div className="loading">Loading...</div>
                  ) : (
                      <div className="blog-content-section">
                        {/* ... */}
                        <Paginate
                            limit={limit}
                            totalPosts={data.products.meta.pagination.total}
                            currentPage={currentPage}
                            paginate={paginate}
                            previousPage={previousPage}
                            nextPage={nextPage}
                        />
                      </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;