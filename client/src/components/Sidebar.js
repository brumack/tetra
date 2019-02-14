import React from 'react'
import '../css/Sidebar.css'

import AddAsset from './AddAsset'
import PortfolioValue from './PortfolioValue'
import Trades from './Trades'

const Sidebar = props => {
  return (
    <div id='Sidebar'>
      <AddAsset {...props} />
      <PortfolioValue {...props} />
      <Trades {...props} />
    </div>
  )
}

export default Sidebar
