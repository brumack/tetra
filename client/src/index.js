import React from 'react'
import ReactDOM from 'react-dom'

import Nav from './components/Nav'
import Welcome from './components/Welcome'
import MobileMessage from './components/MobileMessage'
import Dashboard from './components/Dashboard'
import SlideMessage from './components/SlideMessage'

import { Message, Dimmer, Loader, Container } from 'semantic-ui-react'

import { retrieveToken, storeToken } from './utils/handleToken.js'
import local from './apis/local'
import './Index.css'

import 'react-slidedown/lib/slidedown.css'

import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {

  state = {
    allAssets: null,
    userAssets: [],
    assetSymbolsAndLogos: null,
    token: null,
    message: null,
    loadng: true
  }

  componentDidMount = async () => {
    const assets = await this.getAllAssets()
    this.getAssetSymbolsAndLogos(assets)
    const token = retrieveToken('TETRA')
    if (token) {
      this.verify(token)
    } else {
      this.setState({ loading: false, token: '' })
    }
  }

  verify = async token => {
    const response = await local.get(`/users/verify?token=${token}`)
    const data = response.data
    if (data.success) {
      this.setState({ token, loading: false })
      this.getUserAssets()
    } else {
      this.setState({ token: '', loading: false })
    }
  }

  login = async credentials => {
    const response = await local.post(`/users/login`, credentials)
    const data = response.data
    if (!data.success) {
      this.handleError(data.message)
    } else if (data.token) {
      storeToken(data.token)
      this.setState({ token: data.token })
      this.getUserAssets(data.token)
    }
  }

  signup = async credentials => {
    const response = await local.post(`/users/new`, credentials)
    const data = response.data
    if (!data.success) {
      this.handleError(data.message)
    } else if (data.token) {
      this.setState({ token: data.token })
      storeToken(data.token)
    }
  }

  logout = async () => {
    const response = await local.get(`/users/logout?token=${this.state.token}`)
    const data = response.data
    if (!data.success) {
      this.handleError(data.message)
    } else {
      this.setState({ token: '' })
    }
  }

  getAllAssets = async () => {
    const response = await local.get('/allAssets')
    const data = response.data
    this.setState({ allAssets: data })
    return data
  }

  getUserAssets = async () => {
    const response = await local.get(`/users/assets?token=${this.state.token}`)
    const data = response.data
    if (!data.success) {
      this.handleError(data.message)
    } else {
      this.setState({ userAssets: data.data })
    }
  }

  addAsset = async asset => {
    if (asset) {
      const token = this.state.token
      const response = await local.post(`users/assets`, { token, asset })
      const data = response.data
      if (!data.success) {
        this.handleError(data.message)
      } else {
        const newAsset = { asset, trades: [], quantity: 0, quantityOnly: true }
        this.setState({ userAssets: [...this.state.userAssets, newAsset] })
      }
    } else {
      this.handleError('Error adding asset')
    }
  }

  updateAsset = async asset => {
    const token = this.state.token
    const response = await local.put(`users/assets`, { token, asset })
    const data = response.data
    if (!data.success) {
      this.handleError(data.message)
    } else {
      this.setState({ userAssets: data.data })
    }
  }

  removeAsset = async asset => {
    const token = this.state.token
    const response = await local.delete(`users/assets?token=${token}&asset=${asset.asset}`)
    const data = response.data
    if (!data.success) {
      this.handleError(data.message)
    } else {
      const userAssets = this.state.userAssets
      const updatedAssets = userAssets.filter(currentAsset => asset.asset !== currentAsset.asset)
      this.setState({ userAssets: updatedAssets })
    }
  }

  getAssetSymbolsAndLogos(assets) {
    const assetSymbolsAndLogos = {}
    Object.keys(assets).map(asset => {
      return assetSymbolsAndLogos[asset.toUpperCase()] = assets[asset].ImageUrl
    })
    this.setState({ assetSymbolsAndLogos })
  }

  renderDashboard() {

    const actions = {}
    actions.addAsset = this.addAsset
    actions.removeAsset = this.removeAsset
    actions.updateAsset = this.updateAsset
    if (this.state.token !== '') {
      return (
        <Dashboard
          allAssets={this.state.allAssets}
          userAssets={this.state.userAssets}
          token={this.state.token}
          actions={actions}
          assetSymbolsAndLogos={this.state.assetSymbolsAndLogos} />
      )
    }
  }

  renderWelcome() {
    if (!this.state.token) {
      return (
        <Container id='welcomeContainer'>
          <Welcome token={this.state.token} />
        </Container>
      )
    }
  }

  handleError(message) {
    this.setState({ message })
    setTimeout(() => {
      this.setState({ message: null })
    }, 3000)
  }

  renderError() {
    if (this.state.message !== null)
      return (
        <Message centered={true} negative>
          <p>{this.state.message}</p>
        </Message>
      )
  }

  render() {
    if (this.state.token === null || this.state.allAssets === null || this.state.assetSymbolsAndLogos === null) {
      return (
        <Dimmer active>
          <Loader>Data Loading</Loader>
        </Dimmer>
      )
    } else {
      return (
        <div id="index">
          <SlideMessage open={this.state.message !== null}>
            {this.renderError()}
          </SlideMessage>
          <Nav token={this.state.token} email={this.state.email} login={this.login} logout={this.logout} signup={this.signup} />
          {this.renderWelcome()}
          {this.renderDashboard()}
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))