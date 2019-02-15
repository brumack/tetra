import React from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import Assets from './Assets'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import MobileMessage from './MobileMessage'

import '../css/Dashboard.css'

export default class Dashboard extends React.Component {

  state = {
    userAssets: [],
    allAssets: null,
    activeAsset: {},
    showForm: false,
    actions: null,
    assetSymbolsAndLogos: null,
    assetValues: {},
    portfolioValue: '0.00',
  }

  componentDidMount() {
    this.setState({
      userAssets: this.props.userAssets,
      allAssets: this.props.allAssets,
      actions: this.props.actions,
      assetSymbolsAndLogos: this.props.assetSymbolsAndLogos
    })
  }

  componentWillReceiveProps(newProps) {

    const { userAssets } = newProps
    const { assetValues } = this.state

    console.log('pre userassets', userAssets)
    console.log('pre assetValues', assetValues)

    Object.keys(assetValues).map(asset => {
      console.log(userAssets)
      if (userAssets.map(userAsset => userAsset.asset).indexOf(asset) === -1)
        assetValues[asset] = 0
    })

    console.log('post assetValues', assetValues)

    this.calculateTotalValue(assetValues)
    this.setState({ assetValues })

    if (userAssets !== this.state.userAssets) {
      this.setState({ userAssets })
    }

  }

  handleReturnedValues = asset => {
    const { assetValues } = this.state
    assetValues[asset.name] = asset.value
    console.log('from handle', assetValues)
    this.calculateTotalValue(assetValues)
    this.setState({ assetValues })
  }

  updateActiveAsset = activeAsset => this.setState({ activeAsset })

  hideForm = () => this.setState({ activeAsset: {} })

  calculateTotalValue(assetValues) {
    if (Object.keys(assetValues).length > 0) {
      const portfolioValue = Object.values(assetValues).reduce((a, b) => a + b).toFixed(2)
      console.log(portfolioValue)
      this.setState({ portfolioValue })
    }
  }

  render() {
    if (Object.values(this.state).indexOf(null) === -1 && Object.values(this.state).indexOf(undefined) === -1) {

      const { allAssets, userAssets, actions, assetSymbolsAndLogos, portfolioValue, activeAsset } = this.state
      const { addAsset, updateAsset, removeAsset } = actions

      return (
        <Grid id='Dashboard'>

          <Grid.Row id='topbar' only='tablet mobile'>
            <MobileMessage />
          </Grid.Row>


          <Grid.Row only='computer'>
            <Grid.Column width={5}>
              <Sidebar
                addAsset={addAsset}
                updateAsset={updateAsset}
                allAssets={allAssets}
                removeAsset={removeAsset}
                assetSymbolsAndLogos={assetSymbolsAndLogos}
                portfolioValue={portfolioValue}
                activeAsset={activeAsset}
                hideForm={this.hideForm}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <Assets
                userAssets={userAssets}
                allAssets={allAssets}
                returnValue={this.handleReturnedValues}
                updateActiveAsset={this.updateActiveAsset} />
            </Grid.Column>
          </Grid.Row>
        </Grid >
      )
    }
    return (
      <Loader>Assets Loading</Loader>
    )
  }
}

/* <Grid.Row id='topbar' only='tablet mobile'>
  <Topbar
    add_asset={addAsset}
    allAssets={allAssets}
    portfolioValue={portfolioValue}
  />
</Grid.Row>
  <Grid.Row only='tablet mobile'>
    <Assets
      userAssets={userAssets}
      allAssets={allAssets}
      returnValue={this.handleReturnedValues}
      updateActiveAsset={this.updateActiveAsset} />
  </Grid.Row> */

