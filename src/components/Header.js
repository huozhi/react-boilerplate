import React, {Component} from 'react'
import './Header.css'

export default class Header extends Component {
  static PropTypes

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

Header.propTypes = {
  brand: React.PropTypes.string,
}
