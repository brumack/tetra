import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './components/Login'
import List from './components/List'
import Add from './components/New'
import Nav from './components/Nav'
import Details from './components/Details'
import Trade from './components/Trade'
import RemoveConfirm from './components/RemoveConfirm'

import local from './apis/local'

import './Index.css'

import { retrieveToken, storeToken } from './utils/handleToken.js'

class App extends React.Component {

  state = {
    allAssets: {},
    userAssets: [],
    isLoading: true,
    token: null,
    signUpError: '',
    loginError: '',
    assetsError: ''
  }

  componentDidMount = async () => {
    this.getAllAssets()
    const token = retrieveToken('Tetra_App')
    if (token) {
      const response = JSON.parse(await local.get(`/users/verify?token=${token}`))
      if (response.success) {
        this.setState({ token, isLoading: false })
      } else {
        this.state.set({ isLoading: false })
      }
    }
  }

  login = async (credentials) => {
    const response = await local.post(`/users/login`, credentials)
    return response.data
  }

  receiveToken = (token) => {
    this.setState({ token })
    this.getUserAssets(token)
  }

  logout = async () => {
    const response = await local.get(`/users/logout?token=${this.state.token}`)
    if (!response.data.success) {
      this.setState({ loginError: response.data.message })
    } else {
      this.setState({ token: null })
    }
  }

  getUserAssets = async (token) => {
    const response = await local.get(`/users/assets?token=${this.state.token}`)
    if (!response.data.success)
      this.setState({ assetsError: response.data.message })
    else
      this.setState({ userAssets: response.data.data })
  }

  getAllAssets = async () => {
    const response = await local.get('/allAssets')
    this.setState({ allAssets: response.data })
  }



  render() {

    if (this.state.loading) {
      return <div>Loading</div>
    }

    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path='/'
              render={() => <Nav token={this.state.token} logout={this.logout} />} />
            <div className='ui container'>
              <Route exact path='/login'
                render={() => <Login login={this.login} receiveToken={this.receiveToken} />} />
              <Route path='/list'
                render={() => <List token={this.state.token} userAssets={this.state.userAssets} allAssets={this.state.AllAssets} />} />
              <Route exact path='/new'
                render={() => <Add addUserAsset={this.addUserAsset} />} />
              <Route exact path='/details/:asset'
                render={(props) => (<div><Details getAllAssets={this.getAllAssets} getUserAssets={this.getUserAssets} asset={props.match.params.asset} /></div>)} />
              <Route exact path='/details/:asset/remove'
                render={(props) => (<div><RemoveConfirm asset={props.match.params.asset} removeAsset={this.removeUserAsset} /></div>)} />
              <Route exact path='/trade/:asset'
                render={(props) => (<div><Trade asset={props.match.params.asset} updateAsset={this.updateUserAsset} /></div>)} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))