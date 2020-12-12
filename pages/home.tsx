import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import HeaderComponent from '../src/components/header.component'
import withRedux from '../src/enhandcer/withRedux'
import HomeTemplate from '../src/template/home.template'
import { SetSearchResult } from '../state/actions/inventory.actions'
const HomePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    'home-container': {
      height: '100vh',
    },
    input: {
      height: '30px',
      width: '100%',
      margin: '100px 10px 10px 10px',
    },
  }),
)

const HomePage = (props) => {
  const { dispatch } = props
  const classes = HomePageStyles()
  const [inputValue, setInputValue] = useState('')
  const handleInput = ({ target: { value } }) => setInputValue(value)
  const hanldeEnter = ({ key }) => {
    if (key === 'Enter') {
      fetch(`http://localhost:3001/gaming/search?name=${inputValue}`)
        .then((response) => response.json())
        .then((response) => dispatch(SetSearchResult(response)))
    }
  }
  return (
    <section className={classes['home-container']}>
      <HomeTemplate>
        <TextField
          value={inputValue}
          className={classes.input}
          id="outlined-basic"
          label="Find what you want"
          variant="outlined"
          onChange={(e) => handleInput(e)}
          onKeyPress={(e) => hanldeEnter(e)}
        />
      </HomeTemplate>
    </section>
  )
}

export default withRedux(HomePage)
