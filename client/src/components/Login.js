import React from 'react'
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    open: false,
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

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  handleSubmit = async (e) => {
    const values = this.state
    const response = await this.props.login(values)
    if (response.success) {
      this.setState({ email: '', password: '' })
      this.props.handleClose()
    } else {
      this.setState({ errorMessage: response.message })
    }
  }

  handleClose() {
    this.setState({ email: '', password: '', errorMessage: '' })
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

  render() {
    const { open, dimmer } = this.state
    return (
      <Modal size='mini' dimmer={dimmer} open={open} onUnmount={() => this.handleClose()}>
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          {this.handleError()}
          <Form>
            <Form.Field>
              <label>Email</label>
              <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' content="Cancel" onClick={this.props.handleClose} />
          <Button positive content="Submit" onClick={this.handleSubmit} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Login