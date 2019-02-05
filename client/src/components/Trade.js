import React from 'react'
import Modal from './Modal'
import { Link, Redirect } from 'react-router-dom'

class Trade extends React.Component {
  state = { side: 'BUY', quantity: 0, price: 0, date: this.getTodaysDate(), redirect: false }

  componentDidMount() {
    const asset = this.props.asset
    this.setState({ asset })
  }

  getTodaysDate() {
    let date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = this.state
    values['date'] = new Date(values['date']).getTime()
    this.props.updateAsset(this.state)
    this.setState({ redirect: true })
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  renderTradeModal() {
    if (this.state.redirect)
      return <Redirect to={`/details/${this.state.asset}`} />
    return (
      <form className='ui form' onSubmit={this.handleSubmit}>
        <h4 className='ui dividing header'>{this.props.asset} - Add A New Trade</h4>
        <div className='field'>
          <div className='three fields'>
            <div className='field'>
              <label>Side</label>
              <select className='ui fluid dropdown' name='side' value={this.state.side} onChange={this.handleChange}>
                <option value='BUY'>Buy</option>
                <option value='SELL'>Sell</option>
              </select>
            </div>
            <div className='field'>
              <label>Quantity</label>
              <input type='number' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
            </div>
            <div className='field'>
              <label>Price (BTC)</label>
              <input type='number' name='price' value={this.state.price} onChange={this.handleChange} />
            </div>
            <div className='field'>
              <label>Date</label>
              <input type='date' name='date' value={this.state.date} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <input type='submit' className='ui button' tabIndex='0' />
        <Link to={`/details/${this.state.asset}`}>
          <button className='ui red button'>Cancel</button>
        </Link>
      </form>
    )
  }

  render() {
    if (this.state.asset !== '')
      return (
        <div>
          <Modal content={this.renderTradeModal()} />
        </div>
      )
    return <div>Loading</div>
  }
}

export default Trade
