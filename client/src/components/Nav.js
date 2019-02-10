import React from 'react'
import { Menu, Image, Item, Button, Header, Dropdown } from 'semantic-ui-react'
import Signup from './Signup'
import Login from './Login'
import '../css/Nav.css'
import logo from '../images/tetraLogo.png'

class Nav extends React.Component {

  state = {
    token: null,
    email: null,
    redirect: false,
    signUp: false,
    login: false
  }

  componentDidMount() {
    this.setState({ token: this.props.token, email: this.props.email })
  }

  willReceiveProps(newProps) {
    if (newProps.token !== this.state.token) {
      this.setState({ token: newProps.token })
    }
    if (newProps.email !== this.state.email) {
      this.setState({ email: newProps.email })
    }
  }

  handleClose = () => this.setState({ signUp: false, login: false })

  renderButton() {
    if (this.props.token) {
      return (
        <Menu.Item>
          <Item>
            <Button color='black' onClick={this.props.logout}>Log out</Button>
          </Item>
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item position='right'>
          <Item>
            <Button.Group>
              <Button color='black' onClick={() => this.setState({ login: true })}>Login</Button>
              <Button color='grey' onClick={() => this.setState({ signUp: true })}>Sign Up!</Button>
            </Button.Group>
          </Item>
        </Menu.Item>
      )
    }
  }

  render() {
    return (
      <Menu secondary id='nav'>
        <Signup dimmer={this.state.dimmer}
          open={this.state.signUp}
          handleClose={this.handleClose}
          signup={this.props.signup}
        />
        <Login dimmer={this.state.dimmer}
          open={this.state.login}
          handleClose={this.handleClose}
          login={this.props.login}
        />
        <Menu.Item position='left'>
          <Image src={logo} size='mini' alt='logo' />
          <div id='logo' className='ui large header'>tetra</div>
        </Menu.Item>
        {this.renderButton()}
      </Menu >
    )
  }
}

export default Nav
