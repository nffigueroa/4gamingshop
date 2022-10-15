import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import withRedux, { User } from '../src/enhandcer/withRedux';
import { ItemProduct, Seller } from '../src/interfaces/ItemProduct';
import HomeTemplate from '../src/template/home.template';
import {
  SetProductsByCategory,
  SetSponsors,
} from '../state/actions/inventory.actions';
import { GraphQLClient } from 'graphql-request';

import { CardContainerComponent } from '../src/components/card-container.component';

const CategoryPageStyles = makeStyles((theme) =>
  createStyles({
    'container-sponsors': {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '20px 10px auto 10px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2%',
      },
    },
  })
);

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
  const classes = CategoryPageStyles();
  const [resultList, setResultList] = useState([]);
  const [openBackdrop, setOpenBackDrop] = useState(false);
  const [priceFilter, setPriceFilter] = useState(false);
  const [resultsFiltered, setResultsFiltered] = useState([]);

  const handleClose = () => {
    setOpenBackDrop(false);
  };

  useEffect(() => sortByPrice(resultsFiltered), [resultsFiltered]);

  useEffect(() => {
    dispatch(SetProductsByCategory(products));
    setResultList(products.data);
    setResultsFiltered(products.data);
    dispatch(SetSponsors(products.sponsors));
  }, [products]);
  const handleFilterByStore = (storeClicked?: string) => {
    if (
      (!storeClicked && productsByCategory) ||
      (storeClicked === 'todos' && productsByCategory)
    ) {
      setResultsFiltered(productsByCategory.data);
      return;
    }
    const newListFilteresByStore = resultsFiltered.filter(
      (item: ItemProduct) => item.seller.key === storeClicked
    );
    setResultsFiltered(newListFilteresByStore);
  };
  const hanldeEnter = () => {
    if (!searchBy || searchBy.length < 2) {
      setResultsFiltered(resultList);
      return;
    }
    setResultsFiltered(
      resultList.filter(
        (item: ItemProduct) =>
          item.name && item.name.toUpperCase().includes(searchBy.toUpperCase())
      )
    );
  };
  const sortByPrice = (arr: Array<ItemProduct>) => {
    const sortedList = arr.sort((a: ItemProduct, b: ItemProduct) =>
      !priceFilter
        ? Number(a.value) - Number(b.value)
        : Number(b.value) - Number(a.value)
    );
    setResultList(sortedList);
  };
  useEffect(() => {
    setPriceFilter(filterByPrice);
    sortByPrice(resultsFiltered);
  }, [filterByPrice]);
  useEffect(() => {
    handleFilterByStore(filterByStore);
  }, [filterByStore]);
  useEffect(() => {
    handleFilterByStore('todos');
    sortByPrice(resultsFiltered);
  }, []);
  useEffect(() => {
    if (!searchBy) {
      setResultsFiltered(
        products && products.data.length ? products.data : resultsFiltered
      );
      return;
    }
    console.log(searchBy);
    hanldeEnter();
  }, [searchBy]);
  /*   const handleFavoriteClick = async (_id: string, like: boolean) => {
    console.log('Si entro', _id, like);

    if (_id && like) {
      if (like) {
        const { user }: { user: User } = await fetch(
          `${process.env.NEXT_PUBLIC_ADD_FAVORITE}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userProperties.email, id: _id }),
          }
        ).then((res) => res.json());
        dispatch(SetUserProperties({ ...user }));
      } else {
        const { user }: { user: User } = await fetch(
          `${process.env.NEXT_PUBLIC_REMOVE_FAVORITE}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userProperties.email, id: _id }),
          }
        ).then((res) => res.json());
        dispatch(SetUserProperties({ ...user }));
      }
    }
  }; */
  return (
    <section>
      <Backdrop open={openBackdrop} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <HomeTemplate>
        <CardContainerComponent resultList={resultsFiltered} />
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
