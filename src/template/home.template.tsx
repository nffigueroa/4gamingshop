import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  SetCategorySelected,
  SetPageLoading,
} from '../../state/actions/navigtation.actions'
import HeaderComponent from '../components/header.component'
import { MenuComponent, MenuItem } from '../components/menu.component'
import withRedux from '../enhandcer/withRedux'

const HomeTemplateClasses = makeStyles((theme: Theme) =>
  createStyles({
    'home-template-container': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '90%',
        backgroundColor: '#303030',
        margin: '115px auto auto auto',
        borderRadius: '10px',
      },
    },
    'header-tmp': {},
    menu: {
      display: 'inline-block',
      position: 'relative',
      left: '10px',
    },
    child: {
      display: 'inline-block',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
    body: {
      display: 'flex',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

const HomeTemplate = (props) => {
  const { children, listCategories, dispatch, pageLoading = false } = props
  const theme = useTheme()
  const [openBackdrop, setOpenBackDrop] = useState(false)
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [listMenu, setListMenu] = useState([])
  const router = useRouter()
  useEffect(() => {
    if (!listCategories) {
      return
    }
    setListMenu(
      listCategories.map((item: string) => {
        return {
          txt: item,
          func: () => {
            dispatch(SetCategorySelected(item))
            Router.events.on('routeChangeStart', () => setOpenBackDrop(true))
            Router.events.on('routeChangeComplete', () =>
              setOpenBackDrop(false),
            )

            router.push({ pathname: '/category', query: { filterby: item } })
          },
        }
      }),
    )
  }, [listCategories])
  const classes = HomeTemplateClasses()
  return (
    <section className={classes['home-template-container']}>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <header className={classes['header-tmp']}>
        <HeaderComponent />
      </header>
      <section className={classes.body}>
        {matches ? (
          <section className={classes.menu}>
            <MenuComponent list={listMenu} />
          </section>
        ) : (
          ''
        )}

        <section className={classes.child}>{children}</section>
      </section>
    </section>
  )
}

export default withRedux(HomeTemplate)
