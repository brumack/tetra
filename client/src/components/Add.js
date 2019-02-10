
import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import Autocomplete from './Autocomplete'
import '../css/Add.css'

class Add extends React.Component {
  state = { open: false, disableButton: true, value: '' }

  show = dimmer => () => this.setState({ dimmer, open: true })

  componentWillReceiveProps(newProps) {
    if (newProps.dimmer !== this.state.dimmer) {
      this.setState({ dimmer: newProps.dimmer })
    }
    if (newProps.open !== this.state.open) {
      this.setState({ open: newProps.open })
    }
  }

  displayButton() {
    if (!this.state.disableButton) {
      return <Button
        positive
        icon='plus'
        labelPosition='right'
        content="Add"
        onClick={async () => {
          this.props.addAsset(this.state.value)
          this.props.handleClose()
        }}
      />
    }
    else {
      return <Button
        positive
        disabled
        icon='plus'
        labelPosition='right'
        content="Add"
      />
    }
  }

  disableButton = (disabled) => {
    this.setState({ disableButton: disabled })
  }

  retrieveValue = (value) => {
    this.setState({ value })
  }

  render() {
    const { open, dimmer } = this.state

    return (
      <Modal size='mini' dimmer={dimmer} open={open} onClose={this.props.handleClose}>
        <Modal.Header>Add a New Asset</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Autocomplete allAssetSymbols={this.props.allAssetSymbols}
                disableButton={this.disableButton}
                retrieveValue={this.retrieveValue}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.props.handleClose}>Cancel</Button>
          {this.displayButton()}
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Add