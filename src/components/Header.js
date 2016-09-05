import React, {Component} from 'react'
import styles from './Header.css'

export default class Header extends Component {
  static PropTypes

  render() {
    const {brand} = this.props

    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <h2>{brand}</h2>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  brand: React.PropTypes.string,
}
