import React from 'react'

class Add extends React.Component {

  state = { asset: null }

  handleChange = (e) => {
    this.setState({ asset: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addAsset(this.state.asset)
  }

  render() {
    console.log('add')
    return (
      <div className='ui grid'>
        <div className='row'>
          <div className='eight wide centered column'>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <h4 className='ui dividing header'>Add A New Asset</h4>
              <div className='field'>
                <input type='text' name='name' placeholder='ticker' onChange={this.handleChange} />
              </div>
              <input type='submit' className='ui button' tabIndex='0' />
              <button className='ui red button'>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Add
