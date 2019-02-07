import React from 'react'
import './Nav.css'
import logo from '../images/tetraLogo.png'

class Nav extends React.Component {

  state = {
    token: null,
    redirect: false
  }

  componentWillMount() {
    this.setState({ token: this.props.token })
  }

  willReceiveProps(newProps) {
    if (newProps.token !== this.state.token) {
      this.setState({ token: newProps.token })
    }
  }

  renderButton() {
    if (this.props.token) {
      return <button className="ui black button" onClick={this.props.logout}>Log out</button>
    } else {
      return (
        <div className="ui buttons">
          <button className="ui black button" onClick={this.props.login}>Login</button>
          <div className="or"></div>
          <button className="ui white button" onClick={this.props.signup}>Sign up!</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div id='nav' className='ui secondary pointing menu'>
        <div className='left menu'>
          <a href='/list'>
            <div className='item'>
              <img src={logo} alt='logo' />
              <div id='logo' className='ui large header'>tetra</div>
            </div>
          </a>
        </div>
        <div className='right menu'>
          <div className='ui item'>
            {this.renderButton()}
          </div>
        </div>
      </div >
    )
  }
}

export default Nav
