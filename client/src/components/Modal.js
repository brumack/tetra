import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {

  render() {
    return ReactDOM.createPortal(
      <div className='ui dimmer modals visible active'>
        <div className='ui standard modal visible active'>
          <div className="content">
            <form className="ui form" action="/api/userAssets" method='POST'>
              <h4 className="ui dividing header">Add A New Asset</h4>
              <div className="field">
                <div className="three fields">
                  <div className="field">
                    <input type="text" name="name" placeholder="Ticker" />
                  </div>
                  <div className="field">
                    <input type="text" name="quantity" placeholder="Quantity" />
                  </div>
                  <div className="field">
                    <input type="text" name="exchange" placeholder="Exchange" />
                  </div>
                </div>
              </div>
              <input type='submit' className="ui button" tabIndex="0" />
            </form>
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  }
}

export default Modal