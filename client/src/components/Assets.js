import React from 'react'
import Asset from './Asset'

import { Grid, Loader } from 'semantic-ui-react'

export default class Assets extends React.Component {

  state = {
    userAssets: null,
    allAssets: null
  }

  componentDidMount() {
    this.setState({ userAssets: this.props.userAssets, allAssets: this.props.allAssets, loading: false })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.userAssets !== this.state.userAssets) {
      this.setState({ userAssets: newProps.userAssets })
    }
  }

  renderAssets() {
    return this.state.userAssets.map(asset => {
      const assetData = this.state.allAssets[asset.asset]
      return (
        <Grid.Column key={assetData.Id} className='asset'>
          <Asset {...this.props} asset={asset} />
        </Grid.Column>
      )
    })
  }

  render() {
    if (Object.values(this.state).indexOf(null) === -1 && Object.values(this.state).indexOf(undefined) === -1) {
      return <Grid stackable columns={3} padded>{this.renderAssets()}</Grid>
    }
    return <Loader>Loading</Loader>
  }
}

