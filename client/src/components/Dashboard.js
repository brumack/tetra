import React from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import Assets from './Assets'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

import '../css/Dashboard.css'

export default class Dashboard extends React.Component {

  state = {
    userAssets: null,
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
    this.calculateTotalValue()
    const { userAssets } = newProps
    if (userAssets !== this.state.userAssets) {
      this.setState({ userAssets })
    }
  }

  handleReturnedValues = asset => {
    const { assetValues } = this.state
    assetValues[asset.name] = asset.value
    this.setState({ assetValues })
    this.calculateTotalValue()
  }

  updateActiveAsset = activeAsset => this.setState({ activeAsset })

  hideForm = () => {
    this.setState({ activeAsset: {} })
  }

  calculateTotalValue() {
    if (Object.values(this.state.assetValues).length > 0) {
      const portfolioValue = Object.values(this.state.assetValues).reduce((a, b) => a + b).toFixed(2)
      this.setState({ portfolioValue })
    }
  }

  render() {
    if (Object.values(this.state).indexOf(null) === -1 && Object.values(this.state).indexOf(undefined) === -1) {

      const { allAssets, userAssets, actions, assetSymbolsAndLogos, portfolioValue, activeAsset } = this.state
      const { addAsset, updateAsset, removeAsset } = actions

      return (
        <Grid id='Dashboard'>
          <Grid.Row only='tablet mobile'>
            <Topbar
              add_asset={addAsset}
              allAssets={allAssets}
            />
          </Grid.Row>
          <Grid.Row only='tablet mobile'>
            <Assets
              user_assets={this.state.userAssets}
              allAssets={allAssets}
              actions={actions}
            />
          </Grid.Row>
          <Grid.Row only='computer'>
            <Grid.Column width={6}>
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
            <Grid.Column width={10}>
              <Assets
                userAssets={userAssets}
                allAssets={allAssets}
                returnValue={this.handleReturnedValues}
                updateActiveAsset={this.updateActiveAsset} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }
    return (
      <Loader>Assets Loading</Loader>
    )
  }
}

