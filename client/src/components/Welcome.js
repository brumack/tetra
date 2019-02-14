import React from 'react'
import { Image, Header, Divider, Message, Container } from 'semantic-ui-react'
import logo from '../images/tetraLogo.png'
import '../css/Welcome.css'

const Welcome = () => {
  return (
    <Container>
      <Message id='welcome'>
        <Image centered src={logo} size='tiny' alt='logo' />
        <Header as='h1'>Welcome!</Header>
        <p>For the cryptocurrency enthusiast, Tetra is a portfolio manager which allows you to track your gains (or rektness).
          Manage asset balances, watch interesting tokens, and keep trade records to understand where you caught the bottom, and where you maybe
           made a bad trade.
        </p>
        <Divider />
        <p>Project developed by Bradley Rumack as a work example for potential employers and is free to use.
          <br />
          www.bradrumack.com
          <br />
          brad.rumack@gmail.com
        </p>
      </Message>
    </Container>
  )
}

export default Welcome
