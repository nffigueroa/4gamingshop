import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CardComponent from '../src/components/card.component'
import withRedux from '../src/enhandcer/withRedux'
import { ResponseCategories, ResponseSearch } from '../src/interfaces/Responses'
import HomeTemplate from '../src/template/home.template'
import {
  SetCagories,
  SetInitialResults,
  SetSearchResult,
} from '../state/actions/inventory.actions'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import { ItemProduct, Seller } from '../src/interfaces/ItemProduct'
import Snackbar from '@material-ui/core/Snackbar'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { request, gql, GraphQLClient } from 'graphql-request'

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
      width: '100%',
      justifyContent: 'space-around',
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
  } = props

  const classes = HomePageStyles()
  const [inputValue, setInputValue] = useState('')
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const [resultList, setResultList] = useState([])
  const [priceFilter, setPriceFilter] = useState(true)
  const [snackBAr, setSnackBAr] = useState({ show: false, msg: '' })
  const handleClose = () => {
    setOpenBackDrop(false)
  }
  const handleCloseSnackbar = () => {
    setSnackBAr({ show: false, msg: '' })
  }
  const sortByPrice = (arr: Array<ItemProduct>) => {
    const sortedList = arr.sort((a: ItemProduct, b: ItemProduct) =>
      !priceFilter
        ? Number(a.value) - Number(b.value)
        : Number(b.value) - Number(a.value),
    )
    setResultList(sortedList)
  }
  const handleInput = ({ target: { value } }) => setInputValue(value)
  const handleFilterByStore = (storeClicked?: Seller) => {
    if (!storeClicked) {
      setResultList(inventory.response)
      return
    }
    const newListFilteresByStore = inventory.response.filter(
      (item: ItemProduct) => item.seller.key === storeClicked?.key,
    )
    setResultList(newListFilteresByStore)
  }
  const amendQuery = () => {
    if (inputValue && inputValue.length < 2) {
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_SEARCHENDPOINT}?name=${inputValue}`)
      .then((response) => response.json())
      .then(({ response }) => {
        response.status === 404 &&
          setSnackBAr({ show: true, msg: 'No se encontraron resultados' })
        const res = response.status === 404 ? initialRestults : response
        dispatch(SetSearchResult(res))
        setOpenBackDrop(false)
      })
      .catch((e) =>
        setSnackBAr({ show: true, msg: 'Cannot reach the initial results' }),
      )
  }
  const hanldeEnter = ({ key }) => {
    if (key === 'Enter') {
      setOpenBackDrop(true)
      amendQuery()
    }
  }

  useEffect(() => {
    if (!inventory) {
      return
    }
    sortByPrice(inventory?.response)
  }, [inventory?.response])

  useEffect(() => {
    dispatch(SetSearchResult(initResults))
    dispatch(SetInitialResults(initResults))
    dispatch(SetCagories(categoriesDB))
  }, [])
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
        <section className={classes['container-lookup']}>
          <TextField
            value={inputValue}
            className={classes.input}
            id="outlined-basic"
            label="Marca, Serie o nombre del producto"
            variant="outlined"
            onChange={(e) => handleInput(e)}
            onKeyPress={(e) => hanldeEnter(e)}
            autoComplete={'off'}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={amendQuery}
          >
            Buscar
          </Button>
        </section>

        <section className={classes['container-sponsors']}>
          {inventory && inventory.sponsors && inventory.sponsors.length ? (
            <span className={classes['chip-label']}>Tiendas :</span>
          ) : (
            ''
          )}
          <section className={classes['chip-contaier']}>
            {inventory && inventory.sponsors && inventory.sponsors.length
              ? inventory.sponsors.map((item: Seller) => (
                  <Chip
                    className={classes['chip-component']}
                    label={item.name}
                    color="primary"
                    size="small"
                    icon={<ContactSupportIcon />}
                    onClick={() => handleFilterByStore(item)}
                  />
                ))
              : ''}

            {inventory && inventory.sponsors.length ? (
              <Chip
                className={classes['chip-component']}
                label={'Todos'}
                color="primary"
                size="small"
                icon={<ContactSupportIcon />}
                onClick={() => handleFilterByStore()}
              />
            ) : (
              ''
            )}
          </section>
        </section>
        <section className={classes.filter}>
          {inventory && inventory.sponsors && inventory.sponsors.length ? (
            <span className={classes['chip-filter']}>Filtrar Precio :</span>
          ) : (
            ''
          )}
          <section
            className={classes['filter-icons']}
            style={{ border: priceFilter ? '2px dotted black' : '' }}
          >
            <ArrowDownwardIcon
              onClick={() => {
                setPriceFilter(true)
                sortByPrice(resultList)
              }}
              fontSize="small"
            />
          </section>
          <section
            className={classes['filter-icons']}
            style={{ border: !priceFilter ? '2px dotted black' : '' }}
          >
            <ArrowUpwardIcon
              onClick={() => {
                setPriceFilter(false)
                sortByPrice(resultList)
              }}
              fontSize="small"
            />
          </section>
        </section>

        <section className={classes['cards-container']}>
          {resultList && resultList.length
            ? resultList.map(
                (
                  {
                    name,
                    category,
                    value,
                    seller: { name: sellerName },
                    image,
                    urlRefer,
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
                    url={urlRefer}
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
    categoriesList,
    initialResults: { response, sponsors },
  } = await gqlClient.request(`query {
    initialResults {
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
    categoriesList
  }`)
  return {
    props: {
      categoriesDB: categoriesList,
      initResults: { response, sponsors },
    },
  }
}

export default withRedux(HomePage)
