import React from 'react'
import { Button, Header, Modal, Form, Message } from 'semantic-ui-react'

export default class Login extends React.Component {

  state = {
    email: '',
    password: '',
    showModal: false,
    errorMessage: null
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const values = this.state
    const response = await this.props.login(values)
    if (response.success) {
      this.closeModal()
    } else {
      this.setState({ errorMessage: response.message, email: '', password: '' })
    }
  }

  handleError = () => {
    if (this.state.errorMessage) {
      return <Message error content={this.state.errorMessage} />
    }
  }

  closeModal = () => {
    this.setState({
      email: '',
      password: '',
      showModal: false
    })
  }

  render() {
    const { email, password, showModal } = this.state
    return (
      <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Login</Button>}
        onClose={this.closeModal}
        open={showModal}
        closeIcon>
        <Header icon='bitcoin' content='Login' />
        <Modal.Content>
          {this.handleError()}
          <Form>
            <Form.Field>
              <label>Email</label>
              <input type='text' name='email' value={email} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' name='password' value={password} onChange={this.handleChange} />
            </Form.Field>
            <Button color='red' content="Cancel" onClick={this.closeModal} />
            <Button positive content="Submit" onClick={this.handleSubmit} />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

