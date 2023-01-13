import React, { useState, useContext } from "react";
import CommonLayout from '../../components/shop/common-layout';
// import { withApollo } from '../../helpers/apollo/apollo';
import ProductList from './common/productList';
import { Container, Row} from 'reactstrap';
import FilterPage from './common/filter';
import FilterContext from "../../helpers/filter/FilterContext";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_CATEGORY = gql`
query categories($title: String!){
    categories(filters:{title:{eq:$title}}) {
      data {
        id
        attributes {
          title
          description
          img_shop_1370_385 {
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

    const filterContext = useContext(FilterContext);

    const selectedCategory = filterContext.state;

    var { loading, data, error} = useQuery(GET_CATEGORY, {
        variables: {
            title: selectedCategory,
        }
      });

    const [sidebarView,setSidebarView] = useState(false)
    
    const openCloseSidebar = () => {
        if(sidebarView){
            setSidebarView(!sidebarView)
        } else {
            setSidebarView(!sidebarView)
        }
    }
    return (
        <CommonLayout title="shop" parent="home" >
            <section className="section-b-space ratio_asos">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            {!data || !data.categories || !data.categories.data || !data.categories.data.length === 0 || loading || !data.categories.data[0].attributes.img_shop_1370_385 || !data.categories.data[0].attributes.img_shop_1370_385.data || !data.categories.data[0].attributes.img_shop_1370_385.data.attributes.url
                            ?
                            <FilterPage sm="3" sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} />
                            :
                            <FilterPage sm="3" sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} catImg={data.categories.data[0].attributes.img_shop_1370_385.data.attributes.url}/>
                            }
                            {!data || !data.categories || !data.categories.data || !data.categories.data.length === 0 || loading 
                            ? <ProductList colClass="col-xl-3 col-6 col-grid-box" layoutList=''  openSidebar={() => openCloseSidebar(sidebarView)}/> 
                            : !data.categories.data[0].attributes.img_shop_1370_385 || !data.categories.data[0].attributes.img_shop_1370_385.data || !data.categories.data[0].attributes.img_shop_1370_385.data.attributes.url
                            ? <ProductList colClass="col-xl-3 col-6 col-grid-box" catDesc={data.categories.data[0].attributes.description} layoutList=''  openSidebar={() => openCloseSidebar(sidebarView)}/>
                            : <ProductList colClass="col-xl-3 col-6 col-grid-box" catDesc={data.categories.data[0].attributes.description} catImg={data.categories.data[0].attributes.img_shop_1370_385.data.attributes.url} layoutList=''  openSidebar={() => openCloseSidebar(sidebarView)}/> 
                            }
                        </Row>
                    </Container>
                </div>
            </section>
        </CommonLayout>
    )
}

export default LeftSidebar;