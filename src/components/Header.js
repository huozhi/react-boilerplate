import React, {Component} from 'react'
import './Header.css'

class Header extends Component {
  render() {
    const {brand} = this.props

    return (
      <header className="Header">
        <div className="Container">
          <h2>{brand}</h2>
        </div>
      </header>
    )
  }
}

export default Header
