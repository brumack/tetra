import { Grid, Item, Card, Segment, Image, Header } from 'semantic-ui-react'
import React from 'react'
import { getPrice } from '../utils/apiCalls'
import '../css/Asset.css'



class Asset extends React.Component {

  state = {
    price: 0.00,
    value: 0.00,
    color: 'black',
    modal: false
  }

  componentDidMount() {
    this.getValues()
    this.refresh = setInterval(() => {
      this.getValues()
    }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  getValues = async () => {
    const result = await getPrice(this.props.name)
    const price = result.USD
    const value = price * this.props.quantity
    this.props.returnValue(this.props.name, this.state.value)
    this.setState({ price, value })
  }


  handleClick = () => {
    this.setState({ modal: true })
  }

  render() {
    return (
      <Grid.Column width={8}>
        <Item onClick={this.handleClick}>
          <Card>
            <Card.Content>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column className='asset' textAlign='left' width={3}>
                      <Image src={this.props.logo} size='mini' circular />
                    </Grid.Column>
                    <Grid.Column className='ticker' width={4} textAlign='left'>
                      <Header className='assetHeader' as='h3'>{this.props.name.toLowerCase()}</Header>
                      <Header as='h6'>{this.props.quantity} ${this.state.value.toFixed(2)}</Header>
                    </Grid.Column>
                    <Grid.Column width={9} textAlign='right'>
                      <Header className='price' as='h4'>${this.state.price.toString().slice(0, 8)}</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Card.Content>
          </Card>
        </Item>
      </Grid.Column>
    )
  }
}

export default Asset