import React, { Component } from 'react'
import style from './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className={style.header}>
        <h1>header</h1>
        <h3>subtitle</h3>
      </header>
    )
  }
}

export default Header
