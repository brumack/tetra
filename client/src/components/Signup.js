import React from 'react'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

export default class Signup extends React.Component {

  state = {
    email: '',
    password: '',
    verifyPassword: '',
    modalOpen: false
  }


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  submit = async (e) => {
    const values = this.state
    this.props.signup(values)
  }

  render() {
    const { email, password, verifyPassword } = this.state
    return (
      <Modal trigger={<Button id='signup' onClick={this.handleOpen} size='mini'>Sign Up!</Button>}
        size='mini'
        onClose={this.handleClose}
        open={this.state.modalOpen}
        closeIcon>

        <Header icon='line graph' content='Sign up!' />
        <Modal.Content>
          <Form>
            <Form.Field>
              <input type='text' name='email' placeholder='Email' value={email} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <input type='password' name='verifyPassword' placeholder='Verify Password' value={verifyPassword} onChange={this.handleChange} />
            </Form.Field>
            <Button size='mini' content="Submit" onClick={this.submit} />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}