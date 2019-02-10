import React from 'react'
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    valid: false,
    open: false,
    disableButton: true,
    errorMessage: null
  }

  componentWillReceiveProps(newProps) {
    if (newProps.dimmer !== this.state.dimmer) {
      this.setState({ dimmer: newProps.dimmer })
    }
    if (newProps.open !== this.state.open) {
      this.setState({ open: newProps.open })
    }
  }

  displayButton() {
    if (this.state.valid) {
      return <Button
        positive
        content="Submit"
        onClick={() => this.handleSubmit()}
      />
    }
    else {
      return <Button
        positive
        content="Submit"
        disabled
      />
    }
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update, () => {
      this.checkIfCredentialsValid()
    })
  }

  checkIfCredentialsValid = () => {
    const email = this.state.email
    const password = this.state.password
    const emailCheck = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const validEmail = email.search(emailCheck) === 0
    const validPassword = password.length >= 8
    this.setState({ valid: validEmail && validPassword })
  }

  handleError = () => {
    if (this.state.errorMessage) {
      return (
        <Message
          error
          content={this.state.errorMessage}
        />
      )
    }
  }

  handleSubmit = async (e) => {
    const values = this.state
    const response = await this.props.signup(values)
    console.log(response)
    if (response.success) {
      this.props.handleClose()
    } else {
      this.setState({ errorMessage: response.message })
    }
  }

  render() {
    const { open, dimmer } = this.state
    return (
      <Modal size='mini' dimmer={dimmer} open={open} onClose={this.props.handleClose}>
        <Modal.Header>Sign Up!</Modal.Header>
        <Modal.Content>
          {this.handleError()}

          <Form>
            <Form.Field>
              <label>Email</label>
              <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password (min 8 characters)</label>
              <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.handleClose}>Cancel</Button>
          {this.displayButton()}
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Signup
