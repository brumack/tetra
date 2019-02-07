import React from 'react'
import ReactDOM from 'react-dom'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import Add from './Add'

const Modal = (props) => {
  return (
    ReactDOM.createPortal(
      <div className='ui dimmer modals visible active'>
        <div className='ui small modal visible active'>
          <div className='content'>
            {renderContent(props)}
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    )
  )
}

export default Modal

const renderContent = function (props) {
  switch (props.type) {
    case 'login':
      return <LoginModal login={props.login} />
    case 'signup':
      return <SignupModal signup={props.signup} />
    case 'add':
      console.log('add')
      return <Add addAsset={props.addAsset} />
    default:
  }
}
