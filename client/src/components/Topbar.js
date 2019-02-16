import React from 'react'
import { Header } from 'semantic-ui-react'
import '../css/Topbar.css'
import Trades from './Trades'

import AddAsset from './AddAsset'

const Topbar = props => {
  return (
    <React.Fragment>
      <div id='topbarText'>
        <Header id='topbarHeader' as='h3'>Portfolio Value</Header>
        <Header id='topbarValue' as='h1'>${props.portfolioValue}</Header>
      </div>
      <div id='addButton'>
        <AddAsset {...props} />
      </div>
      <Trades {...props} />
    </React.Fragment>
  )
}

export default Topbar
