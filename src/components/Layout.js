import React from 'react'
import Helmet from 'react-helmet'
import '../assets/scss/init.scss'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Blog by Kinuz" />
        {children}
      </div>
    )
  }
}

export default Layout
