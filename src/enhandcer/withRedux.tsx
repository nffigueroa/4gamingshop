import React from 'react'
import { connect } from 'react-redux'
import { ItemProduct, Seller } from '../interfaces/ItemProduct'
import { ResponseCategories, ResponseSearch } from '../interfaces/Responses'
export enum filterByPriceEnum {
  UP,
  DOWN,
}
export interface User {
  firstName: string
  lastName: string
  email: string
  password?: string
  sendNotifications: boolean
  products: Array<string>
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
    lookupValue: string
    searchBy: string
  }
  user: {
    userProperties: User
    tkn: string
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
    lookupValue: state.navigation.lookupValue,
    searchBy: state.navigation.searchBy,
    userProperties: state.user.userProperties,
    tkn: state.user.tkn,
  })
  return connect(mapStateToProps)(WithRedux)
}

export default withRedux
