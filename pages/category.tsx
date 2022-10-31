import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState, useMemo } from 'react';
import withRedux from '../src/enhandcer/withRedux';
import HomeTemplate from '../src/template/home.template';
import {
  SetProductsByCategory,
  SetSponsors,
} from '../state/actions/inventory.actions';
import { GraphQLClient } from 'graphql-request';

import { CardContainerComponent } from '../src/components/card-container.component';
import { filterProductSearch } from '../src/hooks/use-filter-price.hook';

const CategoryPage = ({
  dispatch,
  categorySelected,
  productsByCategory,
  products,
  filterByPrice,
  filterByStore,
  searchBy,
  userProperties,
}) => {
  const [openBackdrop, setOpenBackDrop] = useState(false);

  const listMemo = useMemo(() => {
    return filterProductSearch(
      filterByPrice,
      productsByCategory?.data,
      filterByStore,
      searchBy
    );
  }, [filterByPrice, productsByCategory, searchBy, filterByStore]);

  const handleClose = () => {
    setOpenBackDrop(false);
  };

  useEffect(() => {
    dispatch(SetProductsByCategory(products));
    dispatch(SetSponsors(products.sponsors));
  }, [products, filterByPrice]);

  return (
    <section>
      <Backdrop open={openBackdrop} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <HomeTemplate>
        {listMemo && listMemo.length && (
          <CardContainerComponent resultList={listMemo} />
        )}
      </HomeTemplate>
    </section>
  );
};
export async function getServerSideProps({ query }) {
  const gqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT);
  const {
    searchProductByCategory: { response, sponsors },
  } = await gqlClient.request(`query {
    searchProductByCategory(categoryName: "${query.filterby}") {
      response {
        _id
        name
        value {
          value
          date
        }
        seller {
          key
          name
        }
        category
        image
        url
      }
      sponsors {
        key
        name
      }
    }
  }`);
  return {
    props: {
      products: { data: response, sponsors },
    },
  };
}

export default withRedux(CategoryPage);
