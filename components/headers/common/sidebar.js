import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
const GET_CATEGORY = gql`
query {
  categories(sort: "title:asc") {
    data {
      id
      attributes {
        title
      }
    }
  }
}
`;
const SideBar = () => {
  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };
  var { loading, data } = useQuery(GET_CATEGORY);
  return (
    <Fragment>
      <div id="mySidenav" className="sidenav">
        <a href={null} className="sidebar-overlay" onClick={closeNav}></a>
        <nav>
          <a href={null} onClick={closeNav}>
            <div className="sidebar-back text-start">
              <i className="fa fa-angle-left pe-2" aria-hidden="true"></i> Back
            </div>
          </a>
          <ul id="sub-menu" className="sidebar-menu">
          {!data || !data.categories || !data.categories.data || data.categories.data.length === 0 || loading
              ? "loading"
              : data &&
              data.categories.data.map((category,index) => (
            <li key={index}>
              <a href={`/shop/store?category=${category.attributes.title}&type=&minPrice=0&maxPrice=1000`}>
                {category.attributes.title}
              </a>
            </li>
          ))}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
