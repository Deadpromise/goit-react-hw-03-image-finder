import { Component } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  render() {
    return (
      <AppContainer>
        <Searchbar></Searchbar>
      </AppContainer>
    );
  }
}
