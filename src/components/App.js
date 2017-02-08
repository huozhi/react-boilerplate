import React from 'react'
import Header from './Header'
import styles from './App.css'

const App = ({children}) => {
  return (
    <div className={styles.app}>
      <Header />
      {children}
    </div>
  )
}

export default App
