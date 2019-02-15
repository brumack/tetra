import React from 'react'
import { Header } from 'semantic-ui-react'
import '../css/Topbar.css'

import AddAsset from './AddAsset'

const Topbar = props => {
  return (
    <React.Fragment>
      <Header as='h3'>Portfolio Value</Header>
      <Header as='h1'>${props.portfolioValue}</Header>
      <AddAsset {...props} />
    </React.Fragment>
  )
}

export default Topbar
