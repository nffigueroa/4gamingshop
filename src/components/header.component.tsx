import {
  Button,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Theme,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import withRedux from '../enhandcer/withRedux'
import {
  SetCategorySelected,
  SetMenuOpened,
} from '../../state/actions/navigtation.actions'
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
    },
    icon: {
      position: 'absolute',
      left: '10px',
      top: '15px',
    },
  }),
)

const HeaderComponent = ({ listCategories, dispatch, menuOpened }) => {
  const router = useRouter()
  const classes = HeaderStyles()

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
  const redirectToHome = () => router.push('/home')
  const handleCategorySelected = (category: string) => {
    dispatch(SetCategorySelected(category))

    dispatch(SetMenuOpened({ left: !menuOpened.left }))

    router.push('/category')
  }
  useEffect(() => {
    dispatch(SetMenuOpened({ left: false }))
  }, [])
  console.log(listCategories)

  return (
    <section className={classes['container-header-com']}>
      {menuOpened ? (
        <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={'left'}
            open={menuOpened.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {listCategories && listCategories?.categories.length ? (
              <List>
                {listCategories?.categories.map((text, index) => (
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

      <MenuIcon
        onClick={toggleDrawer('left', true)}
        className={classes['icon']}
        style={{ fontSize: '50px', color: 'white' }}
      />
      <Image
        onClick={redirectToHome}
        src="/img/Logo4Gamer.png"
        alt="Logo"
        width={80}
        height={30}
      />
    </section>
  )
}

export default withRedux(HeaderComponent)
