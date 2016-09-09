import React, {Component} from 'react'
import styles from './Main.css'

export default class Main extends Component {

  state = {toggler: true}

  handleClick = () => {
    const {toggler} = this.state
    this.setState({toggler: !toggler})
  }

  render() {
    const {toggler} = this.state

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
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
}