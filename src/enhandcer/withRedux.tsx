import React from 'react'
import { connect } from 'react-redux'
import { ResponseCategories, ResponseSearch } from '../interfaces/Responses'

export interface StateInterface {
  inventory: {
    searchResult: ResponseSearch
    initialResults: ResponseSearch
    listCategories: ResponseCategories
    productsByCategory: any
  }
  navigation: {
    categorySelected: string
    menuOpened: {
      left: boolean
    }
  }
}

const withRedux = (Component: Function) => {
  const WithRedux = (props) => {
    return <Component {...props} />
  }
  const mapStateToProps = (state: StateInterface) => ({
    inventory: state.inventory.searchResult,
    initialResults: state.inventory.initialResults,
    listCategories: state.inventory.listCategories,
    categorySelected: state.navigation.categorySelected,
    productsByCategory: state.inventory.productsByCategory,
    menuOpened: state.navigation.menuOpened,
  })
  return connect(mapStateToProps)(WithRedux)
}

export default withRedux
