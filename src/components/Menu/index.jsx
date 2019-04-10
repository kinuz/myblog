import React from 'react'
import { Link } from 'gatsby'
import './style.scss'
import _ from 'lodash'

class Menu extends React.Component {
  render() {
    const selectedMenu = this.props.menu
    const menuBlock = (
      <ul className="menu__list">
        {this.props.data.map(item => {

          const extraClass = _.lowerCase(item.label) === selectedMenu ? " menu__list-item-link--active": ""
          return (
            <li className="menu__list-item" key={item.path}>
              <Link
                to={item.path}
                className={`menu__list-item-link${extraClass}`}
                activeClassName="menu__list-item-link menu__list-item-link--active"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    )
    return <nav className="menu">{menuBlock}</nav>
  }
}

export default Menu
