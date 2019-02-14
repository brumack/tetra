import React from 'react'
import { Header } from 'semantic-ui-react'
import '../css/PortfolioValue.css'

const PortfolioValue = props => {
  return (
    <div id='portfolioValue'>
      <Header>Portfolio Value</Header>
      <Header>${props.portfolioValue}</Header>
    </div>
  )
}

export default PortfolioValue
