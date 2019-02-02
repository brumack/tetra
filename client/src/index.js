import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import List from './components/List'
import Add from './components/Add'
import Nav from './components/Nav'

class App extends React.Component {

  state = {
    assets: [],
    exchanges: []
  }

  getAssets = (assets) => {
    this.setState({ assets })
  }

  render() {
    return (
      <div>
        <Nav />
        <div className='ui container' id='assetList'>
          <BrowserRouter>
            <div>
              <Route path="/"
                render={() => <List />} />
              <Route
                path="/new"
                render={() => <Add />} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))