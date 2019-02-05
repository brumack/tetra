import React from 'react'
import Asset from './Asset'
import Total from './Total'
import cc from '../apis/cc'
import { Link } from 'react-router-dom'


class List extends React.Component {

  state = {
    allAssets: {},
    userAssets: {},
    values: {}
  }


  componentDidMount = async () => {
    const userAssets = await this.props.getUserAssets()
    const allAssets = await this.props.getAllAssets()
    this.setState({ userAssets, allAssets })
  }

  getPrice = async (asset) => {
    const response = await cc.get(`/price?fsym=${asset}&tsyms=USD`)
    return response.data
  }

  renderAssets = () => {
    return Object.keys(this.state.userAssets).map(asset => {
      return <Link to={`/details/${asset}`} key={asset}>
        < Asset
          name={asset}
          quantity={this.state.userAssets[asset].quantity}
          price={this.getPrice}
          logo={'https://cryptocompare.com' + this.state.allAssets[asset].ImageUrl}
        />
      </Link>
    })
  }

  render() {
    if (this.state.userAssets && this.state.allAssets) {
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
              <Total value={0} />
            </div>
          </div>
        </div>
      )
    }
    return <div>loading...</div>
  }
}

export default List
