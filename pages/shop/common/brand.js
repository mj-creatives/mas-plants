import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const GET_BRAND = gql`
query subcategories($type: [ID!]){
  subcategories(filters: { products: {id:{in:$type}}},sort: "title:asc") {
    data {
      id
      attributes {
        title
      }
    }
  }
}
`;

const Brand = () => {
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);

  var { loading, data } = useQuery(GET_BRAND, {
    variables: {
      type: context.subCategories,
    },
  });
  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        Sub Categories
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
          {!data || !data.subcategories || !data.subcategories.data || data.subcategories.data.length === 0 || loading
              ? "loading"
              : data &&
                data.subcategories.data.map((brand, index) => (
                  <div
                    className="form-check custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedBrands.includes(brand.attributes.title)}
                      onChange={() => {
                        context.handleBrands(brand.attributes.title, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={brand.attributes.title}
                    />
                    <label className="custom-control-label" htmlFor={brand.attributes.title}>
                      {brand.attributes.title}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
