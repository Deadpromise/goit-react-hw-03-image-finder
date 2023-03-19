import { Component } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchQuery: '',
  };
  onFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onFormSubmit}></Searchbar>
      </AppContainer>
    );
  }
}
