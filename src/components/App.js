import React from 'react'
import Header from './Header'
import styles from './App.css'
import Main from './Main'

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Main />
    </div>
  )
}

export default App
