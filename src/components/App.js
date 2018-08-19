import React from 'react'
import {hot} from 'react-hot-loader'
import Header from './Header'
import './App.css'
import Main from './Main'


const App = () => {
  return (
    <div className='app'>
      <Header />
      <Main />
    </div>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(module)(App)
