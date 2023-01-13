import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

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

const Category = () => {
  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const selectedCategory = context.state;
  const [url, setUrl] = useState();

  var { loading, data } = useQuery(GET_CATEGORY);

  const updateCategory = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Category
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
            <ul className="category-list">
            {!data || !data.categories || !data.categories.data || data.categories.data.length === 0 || loading
              ? "loading"
              : data &&
              data.categories.data.map((category,index) => (
                <li 
                key={index}
                style={{ 
                  backgroundColor: category.attributes.title === selectedCategory ? '#5D7227': '',
                  borderRadius: category.attributes.title === selectedCategory ? '5px': '',
                  padding: 5,
                  }}>
                <a 
                href={null} onClick={() => updateCategory(category.attributes.title)}
                style={{ 
                  color: category.attributes.title === selectedCategory ? '#F8F8F8': ''
                  }}
                  >
                  {category.attributes.title}
                </a>
              </li>
              ))}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
