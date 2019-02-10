import React from 'react'
import { Menu, Image, Item, Button, Header, Dropdown } from 'semantic-ui-react'
import NewSignup from './Signup'
// import Login from './Login'
import NewLogin from './Login'
import '../css/Nav.css'
import logo from '../images/tetraLogo.png'

class Nav extends React.Component {

  state = { token: null, signUp: false, login: false }

  componentDidMount() {
    this.setState({ token: this.props.token })
  }

  willReceiveProps(newProps) {
    if (newProps.token !== this.state.token) {
      this.setState({ token: newProps.token })
    }
  }

  handleClose = () => {
    this.setState({ signUp: false, login: false })
  }

  renderButton() {
    if (this.props.token) {
      return <Button color='black' onClick={this.props.logout}>Log out</Button>
    }
  }

  render() {
    return (
      <Menu secondary id='nav'>
        <Menu.Item position='left'>
          <Image src={logo} size='mini' alt='logo' />
          <div id='logo' className='ui large header'>tetra</div>
        </Menu.Item>
        <Menu.Item position='right'>
          <Item>
            {this.renderButton()}
          </Item>
        </Menu.Item>
      </Menu >
    )
  }
}

export default Nav
