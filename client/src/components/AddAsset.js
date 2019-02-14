import React from 'react'
import { Button, Header, Modal, Form, Loader } from 'semantic-ui-react'
import '../css/AddAsset.css'

import Autocomplete from './Autocomplete'

export default class AddAsset extends React.Component {

  state = {
    asset: '',
    value: '',
    click: false,
    assetSymbolsAndLogos: null,
    modalOpen: false,
    disableButton: true
  }

  componentDidMount = () => this.setState({ assetSymbolsAndLogos: this.props.assetSymbolsAndLogos })

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  disableButton = disabled => this.setState({ disableButton: disabled })

  retrieveValue = (value, clicked) => {
    this.setState({ value })
    if (clicked) {
      this.props.addAsset(value)
      this.handleClose()
    }
  }

  render() {
    if (Object.values(this.state).indexOf(null) === -1 && Object.values(this.state).indexOf(undefined) === -1)
      return (
        <Modal trigger={<Button id='add' onClick={this.handleOpen} size='massive' circular icon='plus' />}
          size='mini'
          onClose={this.handleClose}
          open={this.state.modalOpen}>
          <Header content='Add A New Asset' />
          <Modal.Content>
            <Form>
              <Form.Field>
                <Autocomplete asset_symbols_and_logos={this.props.assetSymbolsAndLogos}
                  disableButton={this.disableButton}
                  retrieveValue={this.retrieveValue}
                />
              </Form.Field>
              <Button
                id='addButton'
                positive
                icon='plus'
                disabled={this.state.disableButton}
                labelPosition='right'
                content="Add"
                onClick={async () => {
                  this.props.add_asset(this.state.value)
                  this.handleClose()
                }}
              />
            </Form>
          </Modal.Content>
        </Modal>
      )
    return <Loader>Loading</Loader>
  }
}