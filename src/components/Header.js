import React from 'react'
import {connect} from 'react-redux'
import './Header.css'

class Header extends React.Component {
  render() {
    const {loading, message} = this.props
    return (
      <header className='header'>
        <div className='container'>
          <span className='brand'>Header</span>
          <div className='notifications'>
            {loading && <p>loading....</p>}
            {message && <div>{message}</div>}
          </div>
        </div>
      </header>
    )
  }
}

export default Header
