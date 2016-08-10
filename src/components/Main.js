import React, {Component} from 'react'
import './Main.css'

export default class Main extends Component {

  state = {toggler: true}

  handleClick = () => {
    const {toggler} = this.state
    this.setState({toggler: !toggler})
  }

  render() {
    const {toggler} = this.state

    return (
      <div className="Main">
        <div className="Container">
          <div className="Main-section">
            {this.props.children}
          </div>

          <div className="Main-section">
            <button
              className="Button"
              onClick={this.handleClick}
            >
              {toggler ? 'hello' : 'world'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
}
