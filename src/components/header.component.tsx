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
import { Router, useRouter } from 'next/router'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import withRedux, { filterByPriceEnum } from '../enhandcer/withRedux'
import {
  SetCategorySelected,
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
      height: '60px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      boxSizing: 'content-box',
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      borderBottom: '1px solid ' + theme.palette.divider,
      zIndex: 2,

      [theme.breakpoints.up('md')]: {
        width: '90%',
        margin: 'auto',
        backgroundColor: '#303030',
        height: '100px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
      },
    },
    icon: {
      position: 'absolute',
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
        display: 'none',
      },
    },
    'span-title': {
      color: theme.palette.text.primary,
      fontSize: '30px',
      margin: 0,
    },
    'container-mid': {
      width: '50%',
      margin: 'auto',
      display: 'flex',
    },
    input: {
      width: '100%',
    },
    filter: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2%',
        margin: 'auto',
      },
    },
    'chip-filter': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
      display: 'block',
    },
    'filter-icons': {
      margin: 'auto 4px',
      color: theme.palette.text.primary,
      fontSize: '10px',
    },
    select: {
      width: '200px',
      marginLeft: '10px',
    },
    'label-tiendas': {
      color: theme.palette.text.secondary,
      fontSize: '12px',
      margin: 'auto 0',
    },
    'container-store': {
      marginLeft: '20px',
    },
    'container-right': {
      width: '300px',
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
  const handleStore = (item: string) => dispatch(SetFilterByStore(item))
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
  const redirectToHome = () => {
    Router.events.on('routeChangeStart', () => setOpenBackDrop(true))
    Router.events.on('routeChangeComplete', () => setOpenBackDrop(false))
    router.push('/home')
  }
  const handleCategorySelected = (category: string) => {
    dispatch(SetCategorySelected(category))

    dispatch(SetMenuOpened({ left: !menuOpened.left }))

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
            onChange={({ target: { value } }) => handleStore(value.toString())}
            className={classes.select}
          >
            <MenuItem disabled value="">
              <em>Ver:</em>
            </MenuItem>
            <MenuItem
              value={filterByPriceEnum.DOWN}
              onClick={() => {
                setPriceFilter(filterByPriceEnum.DOWN)
                dispatch(SetFilterByPrice(filterByPriceEnum.DOWN))
              }}
            >
              Menor precio primero
            </MenuItem>
            <MenuItem
              value={filterByPriceEnum.UP}
              onClick={() => {
                setPriceFilter(filterByPriceEnum.UP)
                dispatch(SetFilterByPrice(filterByPriceEnum.UP))
              }}
            >
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
      </section>
    </>
  )
  return (
    <section className={classes['container-header-com']}>
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
          id="standard-basic"
          label="Marca, serie o nombre del producto"
          variant="outlined"
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
            ó <Button variant="contained">Inicia Sesion</Button>
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
      {!matches ? (
        <MenuIcon
          onClick={toggleDrawer('left', true)}
          className={classes['icon']}
          style={{ fontSize: '50px', color: 'white' }}
        />
      ) : (
        ''
      )}

      {/*<Image
        onClick={redirectToHome}
        src="/img/Logo4Gamer.png"
        alt="Logo"
        width={80}
        height={30}
        className={classes.img}
      />*/}
    </section>
  )
}

export default withRedux(HeaderComponent)
