import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CardComponent from '../src/components/card.component'
import withRedux from '../src/enhandcer/withRedux'
import { ItemProduct, Seller } from '../src/interfaces/ItemProduct'
import HomeTemplate from '../src/template/home.template'
import {
  SetProductsByCategory,
  SetSponsors,
} from '../state/actions/inventory.actions'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { GraphQLClient } from 'graphql-request'
import useSWR from 'swr'
import { Router, useRouter } from 'next/router'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { SetPageLoading } from '../state/actions/navigtation.actions'

const CategoryPageStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default,
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    'cards-container': {
      marginTop: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-around',
      marginLeft: '30px',
    },
    'chip-label': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
    },
    'container-sponsors': {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '20px 10px auto 10px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2%',
      },
    },
    'chip-component': {
      margin: '5px 5px',
    },
    input: {
      height: '30px',
      width: '100%',
    },
    button: {
      margin: 'auto',
      height: '40px',
      marginTop: '10px',
      marginLeft: '5px',
    },
    'container-lookup': {
      width: '100%',
      margin: '50px 10px 10px 10px',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
      },
    },
    filter: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2%',
      },
    },
    'filter-icons': {
      margin: '0 0 0 5px',
      color: theme.palette.text.primary,
      fontSize: '10px',
    },
    'chip-filter': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
      display: 'block',
    },
  }),
)

const CategoryPage = ({
  dispatch,
  categorySelected,
  productsByCategory,
  products,
  filterByPrice,
  filterByStore,
}) => {
  const classes = CategoryPageStyles()
  const [resultList, setResultList] = useState([])
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const [priceFilter, setPriceFilter] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [resultsFiltered, setResultsFiltered] = useState([])

  const handleClose = () => {
    setOpenBackDrop(false)
  }

  useEffect(() => sortByPrice(resultsFiltered), [resultsFiltered])

  useEffect(() => {
    dispatch(SetProductsByCategory(products))
    setResultList(products.data)
    setResultsFiltered(products.data)
    dispatch(SetSponsors(products.sponsors))
  }, [products])
  const handleFilterByStore = (storeClicked?: string) => {
    if (!storeClicked || storeClicked === 'todos') {
      setResultsFiltered(productsByCategory.data)
      return
    }
    const newListFilteresByStore = productsByCategory.data.filter(
      (item: ItemProduct) => item.seller.key === storeClicked,
    )
    setResultsFiltered(newListFilteresByStore)
  }
  const handleInput = ({ target: { value } }) => setInputValue(value)
  const hanldeEnter = ({ key }) => {
    if (key === 'Enter') {
      if (inputValue.length < 2) {
        setResultsFiltered(resultList)
        return
      }
      setResultsFiltered(
        resultList.filter(
          (item: ItemProduct) =>
            item.name &&
            item.name.toUpperCase().includes(inputValue.toUpperCase()),
        ),
      )
    }
  }
  const sortByPrice = (arr: Array<ItemProduct>) => {
    const sortedList = arr.sort((a: ItemProduct, b: ItemProduct) =>
      !priceFilter
        ? Number(a.value) - Number(b.value)
        : Number(b.value) - Number(a.value),
    )
    setResultList(sortedList)
  }
  useEffect(() => {
    setPriceFilter(filterByPrice)
    sortByPrice(resultsFiltered)
  }, [filterByPrice])
  useEffect(() => {
    handleFilterByStore(filterByStore)
  }, [filterByStore])
  return (
    <section>
      <Backdrop
        className={classes.backdrop}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HomeTemplate>
        <section className={classes['cards-container']}>
          {resultsFiltered && resultsFiltered.length
            ? resultsFiltered.map(
                (
                  {
                    name,
                    value,
                    seller: { name: sellerName },
                    image,
                    category,
                    url,
                  },
                  index: number,
                ) => (
                  <CardComponent
                    key={index}
                    title={name}
                    price={value}
                    seller={sellerName}
                    img={image}
                    category={category}
                    url={url}
                  />
                ),
              )
            : ''}
        </section>
      </HomeTemplate>
    </section>
  )
}
export async function getServerSideProps({ query }) {
  const gqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT)
  const {
    searchProductByCategory: { response, sponsors },
  } = await gqlClient.request(`query {
    searchProductByCategory(categoryName: "${query.filterby}") {
      response {
        name
        value
        seller {
          key
          name
        }
        category
        image
        urlRefer
      }
      sponsors {
        key
        name
      }
    }
  }`)
  return {
    props: {
      products: { data: response, sponsors },
    },
  }
}

export default withRedux(CategoryPage)
