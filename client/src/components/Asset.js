import React from 'react'

class Asset extends React.Component {

  state = { price: 0.00, value: 0.00, color: 'black' }

  componentDidMount() {
    this.getValues()
    setInterval(() => {
      this.getValues()
      this.props.returnValue(this.props.name, this.state.value)
    }, 5000)
  }

  getValues = async () => {
    const price = await this.props.price(this.props.name)
    if (price.USD !== this.state.price) {
      this.setState({ price: price.USD })
      this.setState({ value: this.state.price * this.props.quantity })
      this.props.returnValue(this.props.name, this.state.value)
    }
  }

  render() {
    return (
      <div className='item asset'>
        <div className='card'>
          <div className='content'>
            <div className='ui segment'>
              <div className='ui two column stackable grid'>
                <div className='row'>

                  <div className='column'>
                    <img className='left floated mini ui image' src={this.props.logo} alt={this.props.name}></img>
                    <div className='ui large header'>{this.props.name}</div>
                    <div className='meta'>{this.props.quantity}</div>
                  </div>

                  <div className='right aligned column'>
                    <div className='ui large header'>${this.state.value.toFixed(2)}</div>
                    <div className='meta' style={{ color: this.state.color }}>{`$${this.state.price}`}</div>
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