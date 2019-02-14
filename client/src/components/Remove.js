import React from 'react'
import { Modal, Button, Grid, Item, Header } from 'semantic-ui-react'
import '../css/semantic.min.css'

export default class Remove extends React.Component {

  state = {
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleDelete = () => {
    this.props.remove(this.props.asset.Name)
    this.handleClose()
  }

  render() {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Remove</Button>}
        size='large'
        onClose={this.handleClose}
        open={this.state.modalOpen}
        closeIcon >
        <Modal.Content>
          <Grid>
            <Grid.Row centered>
              <Item>
                <Item.Content>
                  <Header as='h2'>Remove {this.props.asset.Name} from portfolio?</Header>
                  <p>
                    Removing an asset from your portfolio will also remove all trade data for this
                    particular asset. Are you sure you wish to continue?
                  </p>
                </Item.Content>
              </Item>
            </Grid.Row>
            <Grid.Row centered>
              <Item>
                <Item.Content verticalAlign='bottom'>
                  <Button onClick={this.handleClose}>Cancel</Button>
                  <Button floated='right' onClick={this.handleDelete}>Remove</Button>
                </Item.Content>
              </Item>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal >
    )
  }
}