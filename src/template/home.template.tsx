import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import HeaderComponent from '../components/header.component'

const HomeTemplateClasses = makeStyles((theme: Theme) =>
  createStyles({
    'home-template-container': {
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    'header-tmp': {},
  }),
)

const HomeTemplate = (props) => {
  const { children } = props

  const classes = HomeTemplateClasses()
  return (
    <section className={classes['home-template-container']}>
      <header className={classes['header-tmp']}>
        <HeaderComponent />
      </header>
      <section>{children}</section>
    </section>
  )
}

export default HomeTemplate
