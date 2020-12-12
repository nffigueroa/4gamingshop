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
import { ResponseSearch } from '../src/interfaces/Responses'
import HomeTemplate from '../src/template/home.template'
import {
  SetInitialResults,
  SetSearchResult,
} from '../state/actions/inventory.actions'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import { ItemProduct, Seller } from '../src/interfaces/ItemProduct'
import Snackbar from '@material-ui/core/Snackbar'

const HomePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default,
      },
    },
    'home-container': {
      height: '100vh',
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
    },
    'container-sponsors': {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '20px 10px auto 10px',
      width: '100%',
    },
    'chip-component': {
      margin: '5px 5px',
    },
    'chip-label': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
    },
    'chip-contaier': {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
)

const HomePage = (props) => {
  const {
    dispatch,
    inventory,
    initialRestults,
  }: {
    dispatch: any
    inventory: ResponseSearch
    initialRestults: ResponseSearch
  } = props
  const classes = HomePageStyles()
  const [inputValue, setInputValue] = useState('')
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const [resultList, setResultList] = useState([])
  const [snackBAr, setSnackBAr] = useState({ show: false, msg: '' })
  const handleClose = () => {
    setOpenBackDrop(false)
  }
  const handleCloseSnackbar = () => {
    setSnackBAr({ show: false, msg: '' })
  }
  const sortByPrice = (arr: Array<ItemProduct>) => {
    const sortedList = arr.sort(
      (a: ItemProduct, b: ItemProduct) => Number(a.value) - Number(b.value),
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
    fetch(`http://localhost:3001/gaming/search?name=${inputValue}`)
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
    setOpenBackDrop(true)
    fetch('http://localhost:3001/gaming/search/initial')
      .then((response) => response.json())
      .then(({ response }) => {
        dispatch(SetSearchResult(response))
        dispatch(SetInitialResults(response))
        setOpenBackDrop(false)
      })
      .catch((err) =>
        setSnackBAr({ show: true, msg: 'Cannot reach the initial results' }),
      )
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
            label="Busca por Marca, Serie o nombre del producto"
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
          {inventory && inventory.sponsors.length ? (
            <span className={classes['chip-label']}>Tiendas :</span>
          ) : (
            ''
          )}
          <section className={classes['chip-contaier']}>
            {inventory && inventory.sponsors.length
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

        <section className={classes['cards-container']}>
          {resultList && resultList.length
            ? resultList.map(
                (
                  { name, value, seller: { name: sellerName }, image },
                  index: number,
                ) => (
                  <CardComponent
                    key={index}
                    title={name}
                    price={value}
                    seller={sellerName}
                    img={image}
                  />
                ),
              )
            : ''}
        </section>
      </HomeTemplate>
    </section>
  )
}

export default withRedux(HomePage)
