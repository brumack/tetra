import React from 'react'
import { Button, Header, Modal, Grid, Item, Image, Loader } from 'semantic-ui-react'

import Asset from './Asset'

export default class Detail extends React.Component {

  state = {
    asset: null,
    holdings: null,
    modalOpen: false
  }

  componentDidMount() {
    this.setState({ asset: this.props.asset, holdings: this.props.holdings, loading: false })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  retrieveValue = value => this.setState({ value })

  handleDelete = () => {
    this.props.remove_asset(this.props.asset.Name)
    this.handleClose()
  }

  handleReturnShowForm = () => {
    this.props.returnshowform(this.props.holdings)
    this.handleClose()
  }

  render() {
    const { asset, holdings } = this.props
    if (Object.values(this.state).indexOf(null) !== -1) {
      return (
        <Loader>Loading</Loader>
      )
    }
    return (
      <Modal trigger={<Asset {...this.props} onClick={this.handleOpen} />}
        size='tiny'
        onClose={this.handleClose}
        open={this.state.modalOpen}
        closeIcon>
        <Modal.Content>
          <Grid>
            <Grid.Row centered>
              <Item>
                <Item.Content>
                  <Image src={`http://www.cryptocompare.com${asset.ImageUrl}`} size='tiny' avatar alt='logo' />
                  <Header as='h2'>{this.props.asset.Name}</Header>
                </Item.Content>
              </Item>
            </Grid.Row>
            <Grid.Row centered>
              <Item>
                <Item.Content verticalAlign='bottom'>
                  <Button.Group>
                    <Button onClick={this.handleReturnShowForm}>Update</Button>
                    <Button.Or />
                    <Button color="red" onClick={this.handleDelete}>Remove</Button>
                  </Button.Group>
                </Item.Content>
              </Item>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}