import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as feedActions from '../actions/feeds'
import styles from './Main.css'

class Main extends Component {
  state = {
    toggled: false,
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
    const {feeds, notification, loading} = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.section}>
          {this.props.children}
        </div>

        <div>
          <button
            className={styles.btn}
            onClick={this.handleClick}
          >
            {toggled ? 'Toggled' : 'Not toggled'}
          </button>
        </div>

        <div className={styles.section}>
          {feeds && feeds.map((feed, idx) => (<h3 key={`feed-${idx}`}>{feed}</h3>))}
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
}

export default connect(
  ({feeds: {feeds, loading}}) => ({
    feeds,
    loading,
  }), feedActions
)(Main)
