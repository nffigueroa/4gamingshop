import React from 'react'
import { connect } from 'react-redux'

const withRedux = (Component: Function) => {
  const WithRedux = (props) => {
    return <Component {...props} />
  }
  const mapStateToProps = (state) => ({
    inventory: state.inventory,
  })
  return connect(mapStateToProps)(WithRedux)
}

export default withRedux
