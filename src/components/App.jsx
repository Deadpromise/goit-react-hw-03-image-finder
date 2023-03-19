import { Component } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import getImgs from 'services/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchQuery: '',
    results: [],
  };
  onFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    getImgs(searchQuery, 1).then(result => {
      console.log(result.hits);
      if (result.hits.length === 0) {
        alert('Found nothing');
        return;
      }
      this.setState({ results: result.hits });
    });
  };
  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onFormSubmit}></Searchbar>
        <Loader></Loader>
        <ImageGallery results={this.state.results}></ImageGallery>
      </AppContainer>
    );
  }
}
