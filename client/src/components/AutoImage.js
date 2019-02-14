import React from 'react'
import { Loader, Image } from 'semantic-ui-react'
import '../css/AutoImage.css'

export default class AutoImage extends React.Component {
  state = {
    src: null,
    loaded: false,
    suggestion: null
  }

  componentDidMount() {
    this.setState({ src: this.props.src, suggestion: this.props.suggestion })
  }

  handleLoader = () => this.setState({ loaded: true })

  renderLoader = () => {
    if (!this.state.loaded)
      return <Loader id='loader' size='mini' inline active />
    // else
    //   return <Loader id='loader' size='mini' inline visible={false} />
  }

  render() {
    return (
      <div>{this.state.suggestion}{this.renderLoader()}<Image size='mini' src={this.state.src} onLoad={this.handleLoader} avatar /></div>
    )
  }
}

//<div><Image size='mini' src={this.state.src} onLoad={this.handleLoader} avatar />{this.renderLoader()}{this.state.suggestion}</div>