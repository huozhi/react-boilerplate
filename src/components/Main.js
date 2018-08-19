import React from 'react'
import {connect} from 'react-redux'
import * as feedActions from '../actions/feeds'
import './Main.css'

class Main extends React.Component {
  state = {
    toggled: false
  }

  handleClick = () => {
    const {toggled} = this.state
    const {feeds, updateFeeds} = this.props
    const full = feeds.length === 5
    updateFeeds(full ? [] : feeds.concat(['new feed....']))
    this.setState({toggled: !toggled})
  }

  render() {
    const {toggled} = this.state
    const {feeds} = this.props

    return (
      <div className='wrapper'>
        <div className='section'>
          {this.props.children}
        </div>

        <div>
          <button
            className='btn'
            onClick={this.handleClick}
          >
            {toggled ? 'Toggled' : 'Not toggled'}
          </button>
        </div>

        <div className='section'>
          {feeds && feeds.map((feed, idx) => (<h3 key={`feed-${idx}`}>{feed}</h3>))}
        </div>
      </div>
    )
  }
}

export default connect(
  ({feeds: {feeds, loading}}) => ({
    feeds,
    loading
  }), feedActions
)(Main)
