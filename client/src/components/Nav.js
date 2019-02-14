import React from 'react'
import { Menu, Button, Header, Input, Image } from 'semantic-ui-react'

import logo from '../images/tetraLogo.png'
import '../css/Nav.css'

import Signup from './Signup'

class Nav extends React.Component {

  state = {
    token: null,
    email: '',
    password: '',
    errorMessage: null,
    loading: true
  }

  componentDidMount() {
    this.setState({ token: this.props.token })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.state.token) {
      this.setState({ token: newProps.token })
    }
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  handleSubmit = async (e) => {
    this.setState({ email: '', password: '' })
    const values = this.state
    this.props.login(values)
  }

  renderLoginState() {
    if (this.state.token.length === 0) {
      return (
        <React.Fragment>
          <Menu.Item>
            <Input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange} />
          </Menu.Item>
          <Menu.Item>
            <Input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
          </Menu.Item>
          <Menu.Item>
            <Button id='login' onClick={this.handleSubmit}>Log in</Button>
            <Signup signup={this.props.signup} />
          </Menu.Item>
        </React.Fragment>
      )
    }
    return (
      <Menu.Item>
        <Button className='buttons' id='logout' onClick={this.props.logout}>Log out</Button>
      </Menu.Item>
    )
  }

  render() {
    if (this.state.token !== null) {
      return (
        <Menu secondary inverted stackable id='Nav'>
          <Menu.Item position='left'>
            <div>
              <Image src={logo} size='mini' />
              <Header as='h2'>tetra</Header>
            </div>
          </Menu.Item>
          {this.renderLoginState()}
        </Menu>
      )
    } else {
      return <div></div>
    }
  }
}

export default Nav