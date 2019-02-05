import React from 'react'
import './Asset.css'

class Asset extends React.Component {

  state = { price: 0.00, value: 0.00, color: 'black' }

  componentDidMount() {
    this.getValues()
    this.refresh = setInterval(() => {
      this.getValues()
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  getValues = async () => {
    const price = await this.props.price(this.props.name)
    if (price.USD !== this.state.price) {
      this.setState({ price: price.USD })
      this.setState({ value: this.state.price * this.props.quantity })
    }
  }

  render() {
    return (
      <div className='item asset'>
        <div className='card'>
          <div className='content'>
            <div className='ui segment'>
              <div className='ui three column grid'>
                <div className='row'>

                  <div className='four wide center aligned column'>
                    <img className='ui small image' src={this.props.logo} alt={this.props.name}></img>
                  </div>

                  <div className='six wide left aligned column ticker'>
                    <div className='ui large header assetHeader'>{this.props.name}</div>
                    <div className='meta'>{this.props.quantity} (${this.state.value.toFixed(2)})</div>
                  </div>

                  <div className='six wide right aligned column'>
                    <div className='ui large header'>${this.state.price}</div>
                    <div className='meta'></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Asset