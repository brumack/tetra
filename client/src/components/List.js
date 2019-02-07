import React from 'react'
import Asset from './Asset'
import Total from './Total'

class List extends React.Component {

  renderAssets = () => {
    if (this.props.userAssets && this.props.allAssets)
      return this.props.userAssets.map(asset => {
        return <Asset
          key={asset.asset}
          name={asset.asset}
          quantity={asset.quantity}
          price={this.getPrice}
          logo={'https://cryptocompare.com' + this.props.allAssets[asset.asset].ImageUrl}
        />
      })

  }

  handleAdd = () => {
    this.props.modal('add')
  }


  render() {
    if (this.props.allAssets && this.props.userAssets) {
      return (
        <div className='ui two column centered grid'>
          <div className='column'>
            <div className='ui primary button' id='add' onClick={this.handleAdd}>
              <p>+</p>
            </div>
            <div className='ui relaxed list'>
              {this.renderAssets()}
              <Total value={0} />
            </div>
          </div>
        </div>
      )
    } else return <div>Loading...</div>
  }
}

export default List
