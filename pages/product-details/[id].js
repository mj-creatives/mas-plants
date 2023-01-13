import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
// import { withApollo } from '../../helpers/apollo/apollo';
import ThreeColLeftPage from "./product/3_col_left_page";
import {gql, useQuery } from "@apollo/client";

const GET_SINGLE_PRODUCTS = gql`
query product($id: ID!) {
  product(id: $id) {
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
  }
}
`;
const LeftSidebar = () => {
  
  const router = useRouter();

  const str = router.query.id;

  const id = str.substring(0, str.indexOf('-'));

  var { data, loading, error } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: id,
    },
  });

  return (
    <CommonLayout parent="Home" title={!data ? 'product' : data.product.data.attributes.title}>
      <ThreeColLeftPage pathId={id} />
      {
      !data ||
      !data.product ||
      data.product.data.length === 0 ||
        loading ? (
            "loading"
        ) : (
          <ProductSection productData={data}/>
        )}
    </CommonLayout>
  );
}


export default LeftSidebar;