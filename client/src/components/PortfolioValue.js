import React from 'react'
import { Header } from 'semantic-ui-react'
import '../css/PortfolioValue.css'

const PortfolioValue = props => {
  return (
    <div id='portfolioValue'>
      <Header as='h1'>Portfolio Value</Header>
      <p>${props.portfolioValue}</p>
    </div>
  )
}

export default PortfolioValue
