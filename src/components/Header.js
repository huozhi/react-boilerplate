import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.css'

class Header extends React.Component {
  render() {
    const {loading, message} = this.props
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.brand}>Header</span>
          <div className={styles.notifications}>
            {loading && <p>loading....</p>}
            {message && <div>{message}</div>}
          </div>
        </div>
      </header>
    )
  }
}

export default Header