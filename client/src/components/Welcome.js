import React from 'react'
import { Button, Image, Modal, Header, Divider, Container } from 'semantic-ui-react'
import logo from '../images/tetraLogo.png'
import Signup from './Signup'
import Login from './Login'
import '../css/Welcome.css'

class Welcome extends React.Component {

  state = { showModal: false }

  componentDidMount() {
    if (!this.props.token) {
      this.setState({ showModal: true })
    }
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.dimmer !== this.state.dimmer) {
  //     this.setState({ dimmer: newProps.dimmer })
  //   }
  //   if (newProps.open !== this.state.open) {
  //     this.setState({ open: newProps.open })
  //   }
  // }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { showModal } = this.state
    return (
      <Modal
        closeOnDimmerClick={false}
        onClose={this.closeModal}
        open={showModal}>
        <div id='modalLogo' align='center'>
          <Image align='center' src={logo} size='tiny' />
          tetra
         </div>
        <Modal.Content>
          <Container textAlign='center'>
            <Header as='h1' textAlign='center'>Welcome!</Header>
            <p align='centered'>For the cryptocurrency enthusiast, Tetra is a portfolio manager which allows you to track your gains (or rektness).
              Manage asset balances, track interesting tokens, and keep trade records to understand where you caught the bottom, and where you maybe
               made a bad trade.
          </p>
            <Login login={this.props.login} />
            <Signup signup={this.props.signup} />
            <Divider />
            <p>Project developed by Bradley Rumack as a work example for potential employers and is free to use.
          <br />
              www.bradrumack.com
          <br />
              brad.rumack@gmail.com</p>
          </Container>
        </Modal.Content>
      </Modal>
    )
  }

  // render() {
  //   return (
  //     <Modal size='small' onClick={() => this.setState({ open: false })} centered closeIcon>
  //       <div id='modalLogo' align='center'>
  //         <Image align='center' src={logo} size='tiny' />
  //         tetra
  //       </div>
  //       <Modal.Content>
  //         <Container textAlign='center'>
  //           <Header as='h1' textAlign='center'>Welcome!</Header>
  //           <p align='centered'>For the cryptocurrency enthusiast, Tetra is a portfolio manager which allows you to track your gains (or rektness).
  //           Manage asset balances, track interesting tokens, and keep trade records to understand where you caught the bottom, and where you maybe
  //           made a bad trade.
  //         </p>
  //           <Divider />
  //           <p>Project developed by Bradley Rumack as a work example for potential employers and is free to use.
  //         <br />
  //             www.bradrumack.com
  //         <br />
  //             brad.rumack@gmail.com</p>
  //         </Container>
  //       </Modal.Content>
  //     </Modal>
  //   )
  // }
}

export default Welcome