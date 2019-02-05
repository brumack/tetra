import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import List from './components/List'
import Add from './components/Add'
import Nav from './components/Nav'
import Details from './components/Details'
import Trade from './components/Trade'
import RemoveConfirm from './components/RemoveConfirm'
import local from './apis/local'
import './Index.css'

class App extends React.Component {

  state = { allAssets: {} }

  getUserAssets = async () => {
    const response = await local.get('/userAssets')
    return response.data
  }

  getAllAssets = async () => {
    const response = await local.get('/allAssets')
    return response.data
  }

  addUserAsset = (userAsset) => {
    local.post('/userAssets', { userAsset })
  }

  updateUserAsset = (userAsset) => {
    local.put('/userAssets', userAsset)
  }

  removeUserAsset = (userAsset) => {
    local.delete(`/userAssets/${userAsset}`)
  }

  render() {
    console.log('rerendered')
    return (
      <div>
        <Nav />
        <div className='ui container' id='assetList'>
          <BrowserRouter>
            <div>
              <Route exact path='/'
                render={() => <List getUserAssets={this.getUserAssets} getAllAssets={this.getAllAssets} />} />
              <Route exact path='/new'
                render={() => <Add addUserAsset={this.addUserAsset} />} />
              <Route exact path='/details/:asset'
                render={(props) => (<div><Details getAllAssets={this.getAllAssets} getUserAssets={this.getUserAssets} asset={props.match.params.asset} /></div>)} />
              <Route exact path='/details/:asset/remove'
                render={(props) => (<div><RemoveConfirm asset={props.match.params.asset} removeAsset={this.removeUserAsset} /></div>)} />
              <Route exact path='/trade/:asset'
                render={(props) => (<div><Trade asset={props.match.params.asset} updateAsset={this.updateUserAsset} /></div>)} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))