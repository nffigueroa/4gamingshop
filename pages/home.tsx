import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CardComponent from '../src/components/card.component'
import withRedux, { filterByPriceEnum, User } from '../src/enhandcer/withRedux'
import { ResponseCategories, ResponseSearch } from '../src/interfaces/Responses'
import HomeTemplate from '../src/template/home.template'
import {
  SetCagories,
  SetInitialResults,
  SetSearchResult,
  SetSponsors,
} from '../state/actions/inventory.actions'
import { ItemProduct, Seller } from '../src/interfaces/ItemProduct'
import Snackbar from '@material-ui/core/Snackbar'
import { GraphQLClient } from 'graphql-request'
import { SetUserProperties } from '../state/actions/user.actions'

const HomePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default,
      },
    },
    'home-container': {
      height: '100vh',
      overflow: 'scroll',
    },
    'cards-container': {
      marginTop: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
      justifyContent: 'space-around',
      margin: '30px auto auto auto',
      [theme.breakpoints.up('md')]: {
        marginTop: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-around',
        //marginLeft: '50px',
      },
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    'container-lookup': {
      width: '100%',
      margin: '50px 10px 10px 10px',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
      },
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
    'chip-label': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
    },
    'chip-filter': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
      display: 'block',
    },
    'chip-contaier': {
      display: 'flex',
      flexWrap: 'wrap',
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
  }),
)

const HomePage = (props) => {
  const {
    dispatch,
    inventory,
    categoriesDB,
    initialRestults,
    initResults,
    filterByPrice,
    filterByStore,
    lookupValue,
    searchBy,
    resultFromSearch,
    userProperties,
  } = props
  const classes = HomePageStyles()
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const [resultList, setResultList] = useState([])
  const [priceFilter, setPriceFilter] = useState(filterByPriceEnum.DOWN)
  const [snackBAr, setSnackBAr] = useState({ show: false, msg: '' })
  const handleClose = () => {
    setOpenBackDrop(false)
  }
  const handleCloseSnackbar = () => {
    setSnackBAr({ show: false, msg: '' })
  }
  const sortByPrice = (arr: Array<ItemProduct>) => {
    const sortedList = arr.sort((a: ItemProduct, b: ItemProduct) =>
      priceFilter === filterByPriceEnum.UP
        ? Number(a.value) - Number(b.value)
        : Number(b.value) - Number(a.value),
    )
    setResultList(sortedList)
  }
  const handleFilterByStore = (storeClicked: string) => {
    if (!storeClicked || storeClicked === 'todos') {
      setResultList(inventory.response)
      return
    }
    const newListFilteresByStore = inventory.response.filter(
      (item: ItemProduct) => item.seller.key === storeClicked,
    )
    setResultList(newListFilteresByStore)
  }

  useEffect(() => {
    if (!resultFromSearch || !resultFromSearch.response.length) {
      dispatch(SetSearchResult(initResults))
      return
    }
    dispatch(SetSearchResult(resultFromSearch))
    dispatch(SetSponsors(resultFromSearch.sponsors))
  }, [resultFromSearch])

  useEffect(() => {
    if (!inventory) {
      return
    }
    sortByPrice(inventory?.response)
  }, [inventory?.response])
  useEffect(() => {
    dispatch(SetSponsors(initResults.sponsors))
    dispatch(SetInitialResults(initResults))
    dispatch(SetCagories(categoriesDB))
  }, [initResults])
  useEffect(() => {
    dispatch(SetSearchResult(initResults))
    dispatch(SetSponsors(initResults.sponsors))
    dispatch(SetInitialResults(initResults))
    dispatch(SetCagories(categoriesDB))
  }, [])

  useEffect(() => {
    setPriceFilter(filterByPrice)
    sortByPrice(resultList)
  }, [filterByPrice])
  useEffect(() => {
    if (!inventory) {
      return
    }
    handleFilterByStore(filterByStore)
  }, [filterByStore])
  const handleFavoriteClick = async (_id: string, like: boolean) => {
    console.log('Si entro', _id, like)

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
          },
        ).then((res) => res.json())
        dispatch(SetUserProperties({ ...user }))
      } else {
        const { user }: { user: User } = await fetch(
          `${process.env.NEXT_PUBLIC_REMOVE_FAVORITE}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userProperties.email, id: _id }),
          },
        ).then((res) => res.json())
        dispatch(SetUserProperties({ ...user }))
      }
    }
  }

  return (
    <section className={classes['home-container']}>
      <Snackbar
        autoHideDuration={6000}
        open={snackBAr.show}
        onClose={handleCloseSnackbar}
        message={snackBAr.msg}
      />
      <Backdrop
        className={classes.backdrop}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <HomeTemplate>
        <section className={classes['cards-container']}>
          {resultList && resultList.length
            ? resultList.map(
                (
                  {
                    _id,
                    name,
                    category,
                    value,
                    seller: { name: sellerName },
                    image,
                    url,
                  },
                  index: number,
                ) => (
                  <CardComponent
                    id={_id}
                    key={index}
                    title={name}
                    price={value}
                    seller={sellerName}
                    img={image}
                    category={category}
                    url={url}
                    onHeartClick={handleFavoriteClick}
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
  const { searchBy = null } = query

  const gqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT)
  const {
    categoriesList,
    initialResults: { response, sponsors },
    searchByProduct: {
      response: resultsFromSearchResponse,
      sponsors: resultsFromSearchsponsors,
    },
  } = await gqlClient.request(`query {
    initialResults {
      response {
        _id
        name
        value
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
    categoriesList
    searchByProduct(name: "${searchBy}") {
      response {
        _id
        name
        value
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
  }`)

  return {
    props: {
      categoriesDB: categoriesList,
      initResults: { response, sponsors },
      resultFromSearch: {
        response: resultsFromSearchResponse,
        sponsors: resultsFromSearchsponsors,
      },
    },
  }
}

export default withRedux(HomePage)
