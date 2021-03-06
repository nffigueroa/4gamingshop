import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { Router, useRouter } from 'next/router'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import withRedux, { filterByPriceEnum } from '../enhandcer/withRedux'
import {
  AmendSearchBylookUpValue,
  SetCategorySelected,
  SetLookupValue,
  SetMenuOpened,
} from '../../state/actions/navigtation.actions'
import {
  SetFilterByPrice,
  SetFilterByStore,
} from '../../state/actions/inventory.actions'
import { Seller } from '../interfaces/ItemProduct'
const HeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    'container-header-com': {
      backgroundColor: theme.palette.background.default,
      height: '230px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 0,
      boxSizing: 'content-box',
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      overflow: 'hidden',
      borderBottom: '1px solid ' + theme.palette.divider,
      zIndex: 2,
      transition: '0.5s',
      transitionProperty: 'height',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        padding: '10px',
        width: '90%',
        margin: 'auto',
        backgroundColor: '#303030',
        height: '230px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
      },
    },
    icon: {
      position: 'fixed',
      left: '10px',
      top: '15px',
    },
    img: {
      cursor: 'pointer',
    },
    'container-left': {
      display: 'flex',
      cursor: 'pointer',
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        // display: 'none',
      },
    },
    'span-title': {
      color: theme.palette.text.primary,
      fontSize: '30px',
      margin: 0,
    },
    'container-mid': {
      width: '100%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      [theme.breakpoints.up('md')]: {
        width: '50%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
      },
    },
    input: {
      width: '80%',
      margin: 'auto',
      [theme.breakpoints.up('md')]: {
        width: '100%',
        marginLeft: '2%',
        margin: 'auto',
      },
    },
    filter: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2%',
        margin: 'auto',
        flexDirection: 'row',
      },
    },
    'chip-filter': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
      display: 'block',
    },
    'filter-icons': {
      margin: 0,
      fontSize: '10px',
      color: theme.palette.text.primary,
      [theme.breakpoints.up('md')]: {
        margin: 'auto 4px',
      },
    },
    select: {
      width: '200px',
      marginLeft: '10px',
      marginTop: '5px',
      [theme.breakpoints.up('md')]: {
        width: '200px',
        marginLeft: '10px',
      },
    },
    'label-tiendas': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
    },
    'container-store': {
      marginLeft: '0',
      [theme.breakpoints.up('md')]: {
        marginLeft: '20px',
      },
    },
    'container-right': {
      width: '300px',
      position: 'relative',
      top: '-10px',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    'span-registrarse': {
      color: theme.palette.text.secondary,
      display: 'block',
      textAlign: 'center',
    },
    buttons: {},
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    'show-categories': {
      color: theme.palette.text.secondary,
      width: '210px',
      marginLeft: '10px',
      marginTop: '5px',
      textDecoration: 'underline',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
)

const HeaderComponent = ({
  listCategories,
  dispatch,
  menuOpened,
  sponsors,
  filterByStore,
  filterByPrice,
}) => {
  const router = useRouter()
  const classes = HeaderStyles()
  const theme = useTheme()
  const [priceFilter, setPriceFilter] = useState(filterByPriceEnum.DOWN)
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleStore = (item: string) => dispatch(SetFilterByStore(item))
  const handlePriceSort = (item) => {
    setPriceFilter(item)
    dispatch(SetFilterByPrice(item))
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    dispatch(SetMenuOpened({ ...menuOpened, [anchor]: open }))
  }
  const hanldeEnter = ({ key }) => {
    if (key === 'Enter' && router.route === '/') {
      Router.events.on('routeChangeStart', () => setOpenBackDrop(true))
      Router.events.on('routeChangeComplete', () => setOpenBackDrop(false))
      router.push({
        pathname: '/',
        query: {
          searchBy: inputValue,
        },
      })
      return
    }
    if (key === 'Enter') {
      dispatch(AmendSearchBylookUpValue(inputValue))
      setPriceFilter(filterByPriceEnum.DOWN)
      handleStore('todos')
    }
  }
  useEffect(() => {
    setPriceFilter(filterByPriceEnum.DOWN)
    handleStore('todos')
    dispatch(AmendSearchBylookUpValue(''))
  }, [])
  const redirectToHome = () => {
    Router.events.on('routeChangeStart', () => setOpenBackDrop(true))
    Router.events.on('routeChangeComplete', () => setOpenBackDrop(false))
    router.push('/')
  }
  const handleCategorySelected = (category: string) => {
    dispatch(SetCategorySelected(category))

    dispatch(SetMenuOpened({ left: !menuOpened.left }))
    Router.events.on('routeChangeStart', () => setOpenBackDrop(true))
    Router.events.on('routeChangeComplete', () => setOpenBackDrop(false))
    router.push({ pathname: '/category', query: { filterby: category } })
  }
  useEffect(() => {
    dispatch(SetMenuOpened({ left: false }))
  }, [])
  const FilterByPrice = () => (
    <>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className={classes.filter}>
        <section className={classes['filter-icons']}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priceFilter}
            onChange={({ target: { value } }) => handlePriceSort(value)}
            className={classes.select}
          >
            <MenuItem disabled value="">
              <em>Ver:</em>
            </MenuItem>
            <MenuItem value={filterByPriceEnum.DOWN}>
              Menor precio primero
            </MenuItem>
            <MenuItem value={filterByPriceEnum.UP}>
              Mayor precio primero
            </MenuItem>
          </Select>
        </section>

        {sponsors ? (
          <section className={classes['container-store']}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterByStore ? filterByStore : 'todos'}
              onChange={({ target: { value } }) =>
                handleStore(value.toString())
              }
              className={classes.select}
            >
              <MenuItem disabled value="">
                <em>Tiendas</em>
              </MenuItem>

              {sponsors.map((item: Seller) => (
                <MenuItem value={item.key}>{item.name}</MenuItem>
              ))}
              <MenuItem value={'todos'}>Todos</MenuItem>
            </Select>
          </section>
        ) : (
          ''
        )}
        <span
          className={classes['show-categories']}
          onClick={toggleDrawer('left', true)}
        >
          Ver Categorias
        </span>
      </section>
    </>
  )
  return (
    <section
      className={classes['container-header-com']}
      style={{
        height: menuOpened && menuOpened.up ? '230px' : matches ? '80px' : 0,
      }}
    >
      <span className={classes['container-left']} onClick={redirectToHome}>
        <Image
          src="/img/Logo4Gamer.png"
          alt="Logo"
          width={60}
          height={30}
          className={classes.img}
        />
        <h1 className={classes['span-title']}>4GAMERSHOP</h1>
      </span>
      <section className={classes['container-mid']}>
        <TextField
          className={classes.input}
          id="lookup-field"
          label="Marca, serie o nombre del producto"
          variant="outlined"
          onChange={({ target: { value } }) => {
            setInputValue(value)
          }}
          onKeyPress={(e) => hanldeEnter(e)}
        />
        <FilterByPrice />
      </section>
      <section className={classes['container-right']}>
        <span className={classes['span-registrarse']}>
          <p>¿Aún no eres miembro?</p>
          <section className={classes.buttons}>
            <Button variant="contained" color="primary">
              Registrate
            </Button>
            <Button style={{ marginLeft: '10px' }} variant="contained">
              Inicia Sesion
            </Button>
          </section>
        </span>
      </section>
      {menuOpened ? (
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={menuOpened.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {listCategories && listCategories.length ? (
              <List>
                {listCategories.map((text, index) => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => handleCategorySelected(text)}
                  >
                    <ListItemIcon>
                      <ArrowForwardIosIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            ) : (
              ''
            )}
          </SwipeableDrawer>
        </React.Fragment>
      ) : (
        ''
      )}
      {!matches && menuOpened && !menuOpened.up ? (
        <MenuIcon
          onClick={() => dispatch(SetMenuOpened({ ...menuOpened, up: true }))}
          className={classes['icon']}
          style={{ fontSize: '50px', color: 'white' }}
        />
      ) : !matches ? (
        <CloseIcon
          onClick={() => dispatch(SetMenuOpened({ ...menuOpened, up: false }))}
          className={classes['icon']}
          fontSize="small"
          style={{ fontSize: '30px', color: 'white' }}
        />
      ) : (
        ''
      )}
    </section>
  )
}

export default withRedux(HeaderComponent)
