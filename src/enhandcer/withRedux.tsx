import React from 'react'
import { connect } from 'react-redux'
import { ResponseSearch } from '../interfaces/Responses'

export interface StateInterface {
  inventory: {
    searchResult: ResponseSearch
    initialResults: ResponseSearch
  }
}

const withRedux = (Component: Function) => {
  const WithRedux = (props) => {
    return <Component {...props} />
  }
  const mapStateToProps = (state: StateInterface) => ({
    inventory: state.inventory.searchResult,
    initialResults: state.inventory.initialResults,
  })
  return connect(mapStateToProps)(WithRedux)
}

export default withRedux
