import React from 'react'
import { Button, Header, Modal, Form, Message } from 'semantic-ui-react'

export default class Signup extends React.Component {

  state = {
    email: '',
    password: '',
    verifyPassword: '',
    showModal: false,
    errorMessage: null
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  submit = async (e) => {
    const values = this.state
    const response = await this.props.signup(values)
    if (response.success) {
      this.closeModal()
    } else {
      this.setState({ errorMessage: response.message })
    }
  }

  checkIfValid = () => {
    const { email, password, verifyPassword } = this.state
    const emailCheck = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const validEmail = email.search(emailCheck) === 0
    let errorMessage = null
    if (!validEmail) {
      errorMessage = 'Invalid email address.'
    } else if (password.length < 8) {
      errorMessage = 'Invalid password. Password must be 8 characters or longer.'
    } else if (password !== verifyPassword) {
      errorMessage = 'Passwords do not match.'
    } else {
      this.submit()
    }
    this.setState({ email: '', password: '', veirfyPassword: '' })
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
      verifyPassword: '',
      showModal: false,
      errorMessage: null
    })
  }

  render() {
    const { email, password, verifyPassword, showModal } = this.state
    return (
      <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Sign Up!</Button>}
        onClose={this.closeModal}
        open={showModal}
        closeIcon>
        <Header icon='archive' content='Sign up!' />
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
            <Form.Field>
              <label>Verify Password</label>
              <input type='password' name='verifyPassword' value={verifyPassword} onChange={this.handleChange} />
            </Form.Field>
            <Button color='red' content="Cancel" onClick={this.closeModal} />
            <Button positive content="Submit" onClick={this.checkIfValid} />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}