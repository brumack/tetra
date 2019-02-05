import React from 'react'
import Modal from './Modal'
import local from '../apis/local'
import { Link } from 'react-router-dom'
import './Details.css'

class Details extends React.Component {

  state = { asset: null, price: 0.00 }

  componentDidMount = async () => {
    const allAssets = await this.props.getAllAssets()
    const userAssets = await this.props.getUserAssets()
    const assetDetails = allAssets[this.props.asset]
    const userTrades = userAssets[this.props.asset]
    const asset = { ...assetDetails, ...userTrades }
    this.setState({ asset })
  }

  renderTrades(asset) {
    return asset.trades.map(trade => {
      const { side, quantity, price, date } = trade
      return (
        <tr className={side === 'SELL' ? 'negative' : 'positive'}>
          <td>{new Date(date).toJSON().slice(0, 10)}</td>
          <td>{side}</td>
          <td>{quantity}</td>
          <td>{price}₿</td>
          <td>{quantity * price}₿</td>
        </tr>
      )
    })
  }

  renderAssetModal(asset) {
    return (
      <div className='ui grid'>
        <div className='ui centered row'>
          <div className="ui item">
            <div className="content">
              <div className="ui huge header">
                <img id='logo' className="ui mini image" src={`https://cryptocompare.com/${asset.ImageUrl}`} alt='logo' />
                {asset.FullName}
              </div>
            </div>
          </div>
        </div>
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Side</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Cost/Gain</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTrades(this.state.asset)}
          </tbody>
        </table>
        <div className='ui centered row'>
          <div className='ui item'>
            <div className="bottom aligned centered content">
              <Link to={`/trade/${asset.Name}`}>
                <div className="ui basic green button">
                  Add trade record
                </div>
              </Link>
              <Link to='/'>
                <button className='ui basic red button'>Back</button>
              </Link>
              <Link to={`/details/${asset.Name}/remove`}>
                <button className='ui right floated red button'>Remove</button>
              </Link>
            </div>
          </div>
        </div>
      </div >
    )
  }

  render() {
    if (this.state.asset) {
      return (
        <div>
          <Modal content={this.renderAssetModal(this.state.asset)} />
        </div>
      )
    }

    return <div>loading</div>
  }
}

export default Details
