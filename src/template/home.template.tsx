import {
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SetCategorySelected } from '../../state/actions/navigtation.actions'
import HeaderComponent from '../components/header.component'
import { MenuComponent, MenuItem } from '../components/menu.component'
import withRedux from '../enhandcer/withRedux'

const HomeTemplateClasses = makeStyles((theme: Theme) =>
  createStyles({
    'home-template-container': {
      width: '100%',
      backgroundColor: theme.palette.background.default,
      marginTop: '100px',
    },
    'header-tmp': {},
    menu: {
      display: 'inline-block',
    },
    child: {
      display: 'inline-block',
    },
    body: {
      display: 'flex',
    },
  }),
)

const HomeTemplate = (props) => {
  const { children, listCategories, dispatch } = props
  const theme = useTheme()
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
            setTimeout(() => {
              router.push({ pathname: '/category', query: { filterby: item } })
            })
          },
        }
      }),
    )
  }, [listCategories])
  const classes = HomeTemplateClasses()
  return (
    <section className={classes['home-template-container']}>
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
