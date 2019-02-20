import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import '../css/Trades.css'

class Trades extends React.Component {
  state = {
    showForm: null,
    activeAsset: {},
    quantity: 0
  }

  returnInitialState() {
    this.setState({
      showForm: null,
      activeAsset: {},
      quantity: 0
    })
  }

  componentDidMount() {
    this.setState({
      showForm: this.props.showForm,
      activeAsset: this.props.activeAsset,
      quantity: Number(this.props.activeAsset.quantity)
    })
  }

  componentWillReceiveProps(newProps) {
    const { activeAsset, showForm } = newProps

    if (this.state.showForm !== showForm) {
      this.setState({ showForm })
    }
    if (this.state.activeAsset !== activeAsset) {
      this.setState({ activeAsset, quantity: Number(activeAsset.quantity) })
    }
  }

  handleChange = e => this.setState({ quantity: e.target.value })


  handleRemove = e => {
    e.preventDefault()
    this.props.removeAsset(this.state.activeAsset)
    this.returnInitialState()
    this.props.hideForm()
  }


  handleSubmit = e => {
    e.preventDefault()
    const { activeAsset, quantity } = this.state
    const { updateAsset, hideForm } = this.props
    activeAsset.quantity = quantity
    if (quantity >= 0) {
      this.returnInitialState()
      updateAsset(activeAsset)
      hideForm()
    }
  }

  handleClear = e => {
    e.preventDefault()
    this.returnInitialState()
    this.props.hideForm()
  }

  render() {
    const { activeAsset, quantity } = this.state

    if (Object.keys(activeAsset).length > 0) {
      const { asset, quantityOnly } = this.props.activeAsset

      if (quantityOnly) {
        return (
          <Form id='valueForm' size='large'>
            <Form.Field>
              <Form.Input
                label={`${asset} Quantity`}
                name='quantity'
                type='number'
                value={quantity}
                className='no-spin'
                onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <Button id='update' onClick={this.handleSubmit}>Update</Button>
              <Button id='delete'><Icon name='trash alternate' onClick={this.handleRemove} /></Button>
              <Button id='cancel' onClick={this.handleClear}><Icon name='cancel' /></Button>
            </Form.Field>
          </Form >
        )
      }
      return (
        <Form id='tradeForm' size='large'>
          <Form.Group>
            <Form.Field>
              <Form.Input type='text' placeholder='mm/dd/yyyy' />
            </Form.Field>
            <Form.Field>
              <Form.Input placeholder='Asset' />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Form.Input type='number' placeholder='Quantity' />
            </Form.Field>
            <Form.Field>
              <Form.Input type='number' placeholder='Price' />
            </Form.Field>
          </Form.Group>
        </Form>
      )
    } else {
      return null
    }

  }

}

export default Trades
