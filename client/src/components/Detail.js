import React from 'react'
import '../css/semantic.min.css'
import '../css/Details.css'


class Detail extends React.Component {

  state = { asset: null, price: 0.00 }

  componentDidMount = async () => {
    this.setState({ asset: this.props.asset })
  }

  render() {
    return (
      <div id='details' className='ui grid'>
        <div className='ui centered row'>
          <div className="ui item">
            <div className="content">
              <div className="ui huge header">
                <img id='logo' className="ui mini image" src={this.props.asset.logo} alt='logo' />
                {this.props.asset.name}
              </div>
            </div>
          </div>
        </div>
        <table className="ui celled table">
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
          </tbody>
        </table>
        <div className='ui centered row'>
          <div className='ui item'>
            <div className="bottom aligned centered content">
              <div className="ui basic green button">
                Add trade record
                </div>
              <button className='ui basic red button'>Back</button>
              <button className='ui right floated red button'>Remove</button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Detail
