import React from 'react'
import Asset from './Asset'
import Total from './Total'
import cc from '../apis/cc'
import local from '../apis/local'
import { Link } from 'react-router-dom'


class List extends React.Component {

  state = { allAssets: {}, userAssets: {}, values: {} }

  componentDidMount() {
    this.initialize()
  }

  initialize = async () => {
    const allAssets = await local.get('/allAssets')
    const userAssets = await local.get('/userAssets')
    this.setState({ allAssets: allAssets.data, userAssets: userAssets.data })
  }

  getPrice = async (asset) => {
    const response = await cc.get(`/price?fsym=${asset}&tsyms=USD`)
    return response.data
  }

  returnValue = (ticker, value) => {
    const values = this.state.values
    values[ticker] = value
    this.setState({ values })
  }

  totalValue() {
    const tickers = Object.keys(this.state.values)
    if (tickers.length)
      return tickers.map(ticker => this.state.values[ticker]).reduce((a, b) => a + b).toFixed(2)
    return 0
  }

  renderAssets = () => {
    return Object.keys(this.state.userAssets).map(asset => {
      return < Asset key={asset}
        name={asset}
        quantity={this.state.userAssets[asset].quantity}
        price={this.getPrice}
        logo={'https://cryptocompare.com' + this.state.allAssets[asset].ImageUrl}
        returnValue={this.returnValue}
      />
    })
  }

  render() {
    console.log(this.state)
    if (this.state.allAssets && this.state.userAssets) {
      return (
        <div className='ui two column centered grid'>
          <div className='column'>
            <Link to='/new'>
              <div className='ui primary button' id='add'>
                <p>+</p>
              </div>
            </Link>
            <div className='ui relaxed list'>
              {this.renderAssets()}
              <Total value={this.totalValue()} />
            </div>
          </div>
        </div>
      )
    }
    return 'loading'
  }
}

export default List
