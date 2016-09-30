import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as feedActions from '../actions/feeds'
import styles from './Main.css'

class Main extends Component {
  state = {toggler: true}

  handleClick = () => {
    const {toggler} = this.state
    const {feeds, updateFeeds} = this.props
    const newFeeds = feeds.length < 5 ? feeds.concat(['blabla']) : []
    this.setState({toggler: !toggler})
    updateFeeds(newFeeds)
  }

  render() {
    const {toggler} = this.state
    const {feeds} = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.section}>
          {this.props.children}
        </div>

        <div className={styles.section}>
          <button
            className={styles.btn}
            onClick={this.handleClick}
          >
            {toggler ? 'hello' : 'world'}
          </button>
          <div>
            {feeds.map((feed, idx) => (<p key={`feed-${idx}`}>{feed}</p>))}
          </div>
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
}

export default connect(
  ({feeds}) => ({
    feeds,
  }), feedActions
)(Main)
