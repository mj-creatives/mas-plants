import React, { useState } from "react";
import FilterContext from "./FilterContext";
import { useRouter } from "next/router";

const FilterProvider = (props) => {
  const router = useRouter();
  const brand = router.query.type;
  const category = router.query.category;
  const min = router.query.min;
  const max = router.query.max;
  const [subCategories, setSubCategories] = useState([]);
  let param = brand ? brand.split(",") : [];
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category : "All"
  );
  const [selectedBrands, setSelectedBrands] = useState(param ? param : []);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min ? min : 0,
    max: max ? max : 1000,
  });
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);

  const handleBrands = (brand, checked) => {
    var index = selectedBrands.indexOf(brand);

    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ brand, checked }]);
      setSelectedBrands(selectedBrands.filter((e) => e !== brand));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ brand, checked }]);
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        ...props,
        state: selectedCategory,
        setSelectedCategory,
        setSelectedBrands,
        selectedBrands,
        selectedPrice,
        isChecked,
        filterChecked,
        setSelectedPrice,
        subCategories, 
        setSubCategories,
        handleBrands: handleBrands,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
