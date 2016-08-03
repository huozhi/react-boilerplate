import React, {Component} from 'react'
import Header from '../components/Header'
import Main from '../components/Main'

import './App.css'

class App extends Component {
  render() {
    const brand = 'Home'

    return (
      <div>
        <Header brand={brand} />
        <Main>
          <h1>Title</h1>
          <p>Here is some description</p>
        </Main>
      </div>
    )
  }
}

export default App
