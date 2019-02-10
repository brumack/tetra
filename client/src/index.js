import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css';
import { retrieveToken, storeToken } from './utils/handleToken.js'
import Nav from './components/Nav'
import List from './components/List'
import Welcome from './components/Welcome'
import './Index.css'

import {
  verify,
  login,
  signup,
  logout,
  getAllAssets,
  getUserAssets,
  addAsset
} from './utils/apiCalls'

class App extends React.Component {

  state = {
    allAssets: null,
    userAssets: null,
    modal: null,
    token: null,
    email: null
  }

  componentDidMount = async () => {
    this.getAllAssets()
    const token = retrieveToken('TETRA')
    if (token) {
      let state = await verify(token.token)
      if (state.token) {
        this.getUserAssets(state.token)
        this.setState({ email: token.email })
      }
      this.setState(state)
    }
  }

  verify = async () => {
    const state = await verify(this.state.token)
    this.setState(state)
  }

  login = async (credentials) => {
    const state = await login(credentials)
    if (state.token) {
      storeToken({ token: state.token, email: state.email })
      this.getUserAssets(state.token)
    }
    this.setState(state)
    return state
  }

  signup = async (credentials) => {
    const state = await signup(credentials)
    if (state.token)
      storeToken({ token: state.token, email: state.email })
    this.setState(state)
    return state
  }

  logout = async () => {
    const state = await logout(this.state.token)
    this.setState(state)
  }

  getAllAssets = async () => {
    const state = await getAllAssets()
    this.setState(state)
  }

  getUserAssets = async (token) => {
    const state = await getUserAssets(token)
    this.setState(state)
  }

  addAsset = async (asset) => {
    const result = await addAsset(this.state.token, asset)
    if (result.success) {
      const newAsset = { asset, trades: [], quantity: 0 }
      this.setState({ userAssets: [...this.state.userAssets, newAsset] })
    }
    this.setState({ modal: null })
  }

  renderList() {
    if (this.state.allAssets && this.state.userAssets) {
      return (
        <List allAssets={this.state.allAssets}
          userAssets={this.state.userAssets}
          modal={(modal) => this.setState({ modal })}
          token={this.state.token}
          addAsset={this.addAsset} />
      )
    }
  }

  renderWelcome() {
    if (!this.state.token) {
      return <Welcome token={this.state.token} signup={this.signup} login={this.login} />
    }
  }

  render() {
    return (
      <div>
        <Nav token={this.state.token} email={this.state.email} login={this.login} logout={this.logout} signup={this.signup} />
        {this.renderList()}
        {this.renderWelcome()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))