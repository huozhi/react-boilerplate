import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as notificationActions from '../actions/notifications'
import styles from './Header.css'

class Header extends Component {
  componentDidMount() {
    this.props.fetchNotification()
  }

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

export default connect(
  ({notifications: {loading, message}}) => ({
    loading,
    message
  }), notificationActions
)(Header)
