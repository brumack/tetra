import React from 'react'
import { Redirect } from 'react-router-dom'
import '../css/semantic.min.css'


// NEED TO MAKE DELETE REQUEST FROM REMOVE BUTTON

class RemoveConfirm extends React.Component {

  state = {
    asset: null,
    redirect: false
  }

  componentDidMount() {
    this.setState({ asset: this.props.asset })
  }

  remove = (e) => {
    this.props.removeAsset(this.state.asset)
    this.setState({ redirect: true })
  }


  renderConfirmModal() {
    if (this.state.redirect)
      return <Redirect to='/' />
    return (
      <div className='ui grid'>
        <div className='ui centered row'>
          <div className="ui item">
            <div className="content">
              <div className="ui huge header">
                Remove {this.state.asset} from portfolio.
              </div>
              <p>Removing an asset from your portfolio will also remove all trade data for this
                particular asset. Are you sure you wish to continue?
              </p>
            </div>
          </div>
        </div>
        <div className='ui centered row'>
          <div className='ui item'>
            <div className='bottom aligned centered content'>
              <button className='ui basic red button'>Cancel</button>
              <button href='/' className='ui right floated red button' onClick={this.remove}>Remove</button>
            </div>
          </div>
        </div>
      </div >
    )
  }

  render() {
    return (
      <div>
        <Modal content={this.renderConfirmModal()} />
      </div>
    )
  }
}

export default RemoveConfirm
