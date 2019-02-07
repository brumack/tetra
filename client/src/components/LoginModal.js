import React from 'react'

class LoginModal extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const values = this.state
    this.props.login(values)
  }

  render() {
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
}

export default LoginModal
