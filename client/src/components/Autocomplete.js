import React, { Component, Fragment } from "react";
import '../css/Autocomplete.css'
import AutoImage from './AutoImage'

class Autocomplete extends Component {

  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ""
  };


  // Event fired when the input value is changed
  onChange = e => {
    const suggestions = Object.keys(this.props.asset_symbols_and_logos)
    const userInput = e.currentTarget.value

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    ).sort((a, b) => {
      return a.length - b.length
    })

    if (filteredSuggestions.length === 0) {
      this.props.disableButton(true)
    } else {
      this.props.disableButton(false)
    }

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value.toUpperCase()
    });
    this.checkIfValid(e.currentTarget.value.toUpperCase())
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText.toUpperCase()
    }, () => {
      const filteredInput = this.state.userInput.split('').filter(char => char.charCodeAt(0) !== 10).join('')
      this.props.retrieveValue(filteredInput, true)
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
      });

      if (filteredSuggestions.length) {
        this.setState({ userInput: filteredSuggestions[activeSuggestion] })
        this.checkIfValid(filteredSuggestions[activeSuggestion])
      } else {
        this.setState({ userInput: '' })
      }
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

  };

  checkIfValid = (input) => {
    if (Object.keys(this.props.asset_symbols_and_logos).indexOf(input) === -1) {
      this.props.disableButton(true)
    } else {
      this.props.disableButton(false)
    }
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (

                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  <AutoImage src={`https://cryptocompare.com${this.props.asset_symbols_and_logos[suggestion]}`} suggestion={suggestion} />
                </li>
              );
            }).slice(0, 10)}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Asset not found.</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          autoFocus
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;

//                   <Image src={`https://cryptocompare.com${this.props.asset_symbols_and_logos[suggestion]}`} avatar />
