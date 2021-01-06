import React from 'react'
import { connect } from 'react-redux'
import { Seller } from '../interfaces/ItemProduct'
import { ResponseCategories, ResponseSearch } from '../interfaces/Responses'
export enum filterByPriceEnum {
  UP,
  DOWN,
}
export interface StateInterface {
  inventory: {
    searchResult: ResponseSearch
    initialResults: ResponseSearch
    listCategories: ResponseCategories
    productsByCategory: any
    filterByPrice: filterByPriceEnum
    filterByStore: string
    sponsors: Array<Seller>
  }
  navigation: {
    categorySelected: string
    menuOpened: {
      left: boolean
    }
    page_loading: boolean
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
    pageLoading: state.navigation.page_loading,
    filterByPrice: state.inventory.filterByPrice,
    filterByStore: state.inventory.filterByStore,
    sponsors: state.inventory.sponsors,
  })
  return connect(mapStateToProps)(WithRedux)
}

export default withRedux
