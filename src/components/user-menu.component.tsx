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
  SetSearchResult,
  SetSponsors,
} from '../../state/actions/inventory.actions'

import { RemoveTKN } from '../../state/actions/user.actions'
import { Seller } from '../interfaces/ItemProduct'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    fontFamily: 'OpenSans-Light',
    color: theme.palette.text.secondary,
    borderBottom: '1px solid ' + theme.palette.text.secondary,
  },
  menu: {
    width: 'auto',
  },
}))
const UserMenu = ({
  name,
  logOutFunc,
  dispatch,
  userProperties,
  initialResults,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const router = useRouter()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])
  const getMyProducts = async () => {
    const { email } = userProperties
    router.push('/home')

    const { response, sponsors } = await fetch(
      `${process.env.NEXT_PUBLIC_CALL_FAVORITEs}?email=${email}`,
    ).then((res) => res.json())
    dispatch(SetSearchResult({ response }))
    setOpen(false)
  }
  const doLogOut = () => {
    dispatch(SetSearchResult(initialResults))
    logOutFunc()
    setOpen(false)
    router.push('/home')
  }
  return (
    <section>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <span className={classes.paper}>
            Bienvenido, {name} <ArrowDropDownIcon />
          </span>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ width: '100%' }}
          className={classes.menu}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={() => getMyProducts()}>
                      Mis Productos
                    </MenuItem>
                    <MenuItem onClick={() => doLogOut()}>Salir</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </section>
  )
}

export default withRedux(UserMenu)
