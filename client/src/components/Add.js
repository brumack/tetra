import React from 'react'
import Modal from './Modal'
import { Link, Redirect } from 'react-router-dom'

class Add extends React.Component {

  state = { newAsset: null, redirect: false }

  handleChange = (e) => {
    this.setState({ newAsset: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addUserAsset(this.state.newAsset)
    this.setState({ redirect: true })
  }

  renderRedirect = () => {
    if (this.state.redirect)
      return <Redirect to='/' />
  }

  renderAddModal() {
    return (
      <div className='ui grid'>
        {this.renderRedirect()}
        <div className='row'>
          <div className='eight wide centered column'>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <h4 className='ui dividing header'>Add A New Asset</h4>
              <div className='field'>
                <input type='text' name='name' placeholder='ticker' onChange={this.handleChange} />
              </div>
              <input type='submit' className='ui button' tabIndex='0' />
              <Link to='/' >
                <button className='ui red button'>Cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Modal content={this.renderAddModal()} />
      </div>
    )
  }
}

export default Add
