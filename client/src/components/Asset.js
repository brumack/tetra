import { Card, Image, Loader } from 'semantic-ui-react'
import React from 'react'
import { getPrice } from '../utils/apiCalls'
import '../css/Asset.css'

class Asset extends React.Component {

  state = {
    USD: null,
    value: null,
    loading: true,
    quantity: null
  }

  componentDidMount() {
    this.setState({ quantity: this.props.asset.quantity })
    this.getValues()
    this.refresh = setInterval(this.getValues, 30000)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.asset.quantity !== this.state.quantity) {
      this.setState({ quantity: newProps.asset.quantity })
      this.getValues()
    }
  }

  componentWillUnmount = () => clearInterval(this.refresh)

  handleImageLoad = () => this.setState({ imageLoaded: true })

  handleClick = () => this.props.updateActiveAsset(this.props.asset)

  getValues = async () => {
    const { returnValue } = this.props
    const { asset, quantity } = this.props.asset
    getPrice(asset, this.props.token, (response) => {
      console.log(response)
      const USD = response.data
      if (USD) {
        const value = USD * quantity
        returnValue({ name: asset, value: value })
        this.setState({ USD, value })
      } else {
        clearInterval(this.refresh)
        this.setState({ USD: 0, value: 0 })
      }
    })
  }

  render() {
    const { asset, allAssets } = this.props
    const { quantity } = asset
    const logo = `http://www.cryptocompare.com/${allAssets[asset.asset].ImageUrl}`
    const { USD } = this.state

    if (Object.values(this.state).indexOf(null) !== -1) {
      return <Loader active inline='centered'></Loader>
    }

    return (
      <Card className='asset' onClick={this.handleClick}>
        <Card.Content>
          <Image circular floated='right' size='tiny' src={logo} />
          <Card.Content floated='left'>
            <Card.Header className='ticker'>{asset.asset.toLowerCase()}</Card.Header>
            <Card.Meta className='price'>${USD}</Card.Meta>
            <Card.Meta className='quantity'>{Number(quantity)}</Card.Meta>
            <Card.Meta className='value'>${(quantity * USD).toFixed(2)}</Card.Meta>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }
}

export default Asset