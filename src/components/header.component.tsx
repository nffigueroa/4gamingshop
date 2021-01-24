import {
  Backdrop,
  Button,
  CircularProgress,
  ClickAwayListener,
  createStyles,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Select,
  SwipeableDrawer,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import ClearIcon from '@material-ui/icons/Clear'
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
  SetInitialResults,
  SetSponsors,
} from '../../state/actions/inventory.actions'

import { RemoveTKN } from '../../state/actions/user.actions'
import { Seller } from '../interfaces/ItemProduct'
import UserMenu from './user-menu.component'
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
        overflow: 'unset',
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
      zIndex: -1,
      [theme.breakpoints.up('md')]: {
        zIndex: 0,
        width: '55%',
        margin: 'auto',
        marginLeft: '0',
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
      //top: '-10px',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        width: 'auto',
      },
    },
    'span-registrarse': {
      color: theme.palette.text.secondary,
      display: 'block',
      textAlign: 'center',
      marginBottom: '10px',
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
    welcome: {
      fontFamily: 'OpenSans-Light',
      color: theme.palette.text.secondary,
      textAlign: 'center',
    },
    'menu-option': {
      fontSize: '50px',
      color: 'white',
      position: 'fixed',
      bottom: '100px',
      right: '50px',
      borderRadius: '50%',
      backgroundColor: theme.palette.background.paper,
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
  userProperties,
  tkn,
}) => {
  const [user, setUser] = useState(userProperties)
  const router = useRouter()
  const classes = HeaderStyles()
  const theme = useTheme()
  const [priceFilter, setPriceFilter] = useState(filterByPriceEnum.DOWN)
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleStore = (item: string) => dispatch(SetFilterByStore(item))
  useEffect(() => {
    setUser(userProperties)
  }, [userProperties])
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
        height: menuOpened && menuOpened.up ? '300px' : matches ? '80px' : 0,
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
      {!matches ? (
        <MemberOption
          tkn={user && tkn ? tkn : null}
          fName={user && user.firstName ? user.firstName : null}
          lName={user && user.lastName ? user.lastName : null}
          logOutFunc={() => dispatch(RemoveTKN())}
        />
      ) : (
        ''
      )}

      <section className={classes['container-mid']}>
        <TextField
          className={classes.input}
          id="lookup-field"
          label="Serie o nombre del producto"
          variant="outlined"
          onChange={({ target: { value } }) => {
            setInputValue(value)
          }}
          onKeyPress={(e) => hanldeEnter(e)}
        />
        <FilterByPrice />
      </section>
      <section
        className={classes['container-right']}
        style={{
          top:
            user && tkn && user.firstName && user.lastName ? '20px' : '-10px',
        }}
      >
        <MemberOption
          tkn={user && tkn ? tkn : null}
          fName={user && user.firstName ? user.firstName : null}
          lName={user && user.lastName ? user.lastName : null}
          logOutFunc={() => dispatch(RemoveTKN())}
        />
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

export const MemberOption = ({ tkn, fName, lName, logOutFunc }) => {
  const classes = HeaderStyles()
  const theme = useTheme()
  const router = useRouter()

  return (
    <>
      {fName && lName && tkn ? (
        <div className={classes.welcome}>
          <UserMenu name={`${fName} ${lName}`} logOutFunc={logOutFunc} />
        </div>
      ) : (
        <span className={classes['span-registrarse']}>
          <p>¿Aún no eres miembro?</p>
          <section className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push({ pathname: '/register' })}
            >
              Registrate
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant="contained"
              onClick={() => router.push({ pathname: '/login' })}
            >
              Inicia Sesion
            </Button>
          </section>
        </span>
      )}
    </>
  )
}

export default withRedux(HeaderComponent)
