import React from 'react'
import Modal from './Modal'
import local from '../apis/local'

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    redirect: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const values = this.state
    const success = await this.props.login(values)
    if (success) {
      this.setState({ redirect: true })
    }
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  renderLoginModal() {
    return (
      <form className='ui form' onSubmit={this.handleSubmit}>
        <h4 className='ui dividing header'>Login</h4>

        <div className='field'>
          <label>Email</label>
          <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
        </div>

        <div className='field'>
          <label>Password</label>
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
        </div>

        <input type='submit' className='ui button' tabIndex='0' />
        <button className='ui red button'>Cancel</button>

      </form>
    )
  }

  render() {
    return (
      <div>
        <Modal content={this.renderLoginModal()} />
      </div>
    )
  }
}

export default Login