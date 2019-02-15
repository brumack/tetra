import React from 'react'
import { Image, Header, Divider, Message, Container } from 'semantic-ui-react'
import logo from '../images/tetraLogo.png'
import '../css/MobileMessage.css'

const MobileMessage = () => {
  return (
    <Container id='messageContainer'>
      <Message id='mobileMessage'>
        <Image centered src={logo} size='tiny' alt='logo' />
        <Header as='h1'>Mobile still in development!</Header>
        <Divider />
        <p>
          Thanks for checking out my app! The mobile version is currently in development, along with
          detailed trade tracking. Updates are made frequently and a working mobile layout will be available soon!
        </p>
      </Message>
    </Container>
  )
}

export default MobileMessage
