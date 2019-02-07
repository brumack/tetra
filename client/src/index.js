import React from 'react'
import ReactDOM from 'react-dom'
import { retrieveToken, storeToken } from './utils/handleToken.js'
import Nav from './components/Nav'
import Modal from './components/Modal'
import List from './components/List'
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
    token: null
  }

  componentDidMount = async () => {
    this.getAllAssets()
    const token = retrieveToken('TETRA')
    if (token) {
      let state = await verify(token)
      if (state.token) {
        this.getUserAssets(state.token)
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
      storeToken(state.token)
      this.getUserAssets(state.token)
    }
    this.setState(state)
  }

  signup = async (credentials) => {
    const state = await signup(credentials)
    if (state.token)
      storeToken(state.token)
    this.setState(state)
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

  renderModal = (modal) => {
    switch (modal) {
      case 'login':
        return <Modal login={this.login} type='login' />
      case 'signup':
        return <Modal signup={this.signup} type='signup' />
      case 'add':
        return <Modal addAsset={this.addAsset} type='add' />
      default:
        return;
    }
  }

  renderList() {
    if (this.state.allAssets && this.state.userAssets) {
      return (
        <List allAssets={this.state.allAssets}
          userAssets={this.state.userAssets}
          modal={(modal) => this.setState({ modal })}
          token={this.state.token} />
      )
    }
  }

  render() {
    return (
      <div>
        <Nav token={this.state.token} logout={this.logout} />
        {this.renderModal(this.state.modal)}
        {this.renderList()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))