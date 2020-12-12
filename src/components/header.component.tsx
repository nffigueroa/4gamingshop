import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
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
      position: 'relative',
      borderBottom: '1px solid ' + theme.palette.divider,
    },
    icon: {
      position: 'absolute',
      left: '10px',
      top: '15px',
    },
  }),
)

const HeaderComponent = (props) => {
  const classes = HeaderStyles()
  return (
    <section className={classes['container-header-com']}>
      <MenuIcon
        className={classes['icon']}
        style={{ fontSize: '50px', color: 'white' }}
      />
      <Image src="/img/Logo4Gamer.png" alt="Logo" width={80} height={30} />
    </section>
  )
}

export default HeaderComponent
