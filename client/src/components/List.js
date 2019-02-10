import React from 'react'
import Asset from './Asset'
import Add from './Add'
import { Grid, Container, Dimmer, Loader, Header, Button } from 'semantic-ui-react'
import '../css/List.css'

class List extends React.Component {

  state = {
    portfolioValue: 0,
    assetValues: [],
    open: false,
    token: ''
  }

  componentDidMount() {
    const assetValues = {}
    this.props.userAssets.map(asset => assetValues[asset] = 0)
    this.setState({ assetValues, token: this.props.token })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.state.token) {
      this.setState({ token: this.props.token })
    }
  }

  returnValue = (asset, value) => {
    const assetValues = this.state.assetValues
    assetValues[asset] = value
    const portfolioValue = Object.values(assetValues).reduce((a, b) => a + b)
    this.setState({ portfolioValue, assetValues })
  }

  handleClose = () => this.setState({ open: false })

  renderAssets = () => {

    return this.props.userAssets.map((asset, idx) => {
      return <Asset
        key={asset.asset}
        name={asset.asset}
        quantity={asset.quantity}
        price={this.getPrice}
        logo={'https://cryptocompare.com' + this.props.allAssets[asset.asset].ImageUrl}
        onClick={this.handleDetail}
        returnValue={this.returnValue}
      />
    })
  }

  render() {
    if (this.props.allAssets && this.props.userAssets && this.props.token) {
      const allAssetSymbols = {}
      Object.keys(this.props.allAssets).map(asset => {
        return allAssetSymbols[asset.toUpperCase()] = this.props.allAssets[asset].ImageUrl
      })
      return (
        <Grid id='main'>
          <Add dimmer={this.state.dimmer}
            open={this.state.open}
            handleClose={this.handleClose}
            allAssetSymbols={allAssetSymbols}
            addAsset={this.props.addAsset}
          />
          <Grid.Row only='computer'>
            <Grid.Column width={5} textAlign='center' id='sidebar'>
              <Button circular primary size='massive' icon='plus' onClick={() => this.setState({ open: true })} />
              <Header as='h1'>Portfolio Value</Header>
              <Header as='h1'>${this.state.portfolioValue.toFixed(2)}</Header>
              <Header as='h4'>0.00BTC</Header>
            </Grid.Column>
            <Grid.Column width={10}>
              <Container>
                <Grid stackable columns={1} id='assetList'>
                  {this.renderAssets()}
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile' id='topbar' centered colums={3}>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6} textAlign='center'>
              <Header as='h5'>Portfolio Value</Header>
              <Header as='h1'>${this.state.portfolioValue.toFixed(2)}</Header>
              <Header as='h5'>0.00BTC</Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button circular primary size='massive' icon='plus' onClick={() => this.setState({ open: true })} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column only='mobile' width={16}>
              <Container>
                <Grid stackable columns={1} id='assetList'>
                  {this.renderAssets()}
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else return <Dimmer><Loader>Loading</Loader></Dimmer>
  }
}

export default List