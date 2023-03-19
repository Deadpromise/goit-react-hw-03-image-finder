import { Component } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import getImgs from 'services/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
  };
  onFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({ page: 1 });
    this.setState({ searchQuery });
    getImgs(searchQuery, this.state.page).then(result => {
      console.log('form req');
      if (result.hits.length === 0) {
        alert('Found nothing');
        return;
      }
      this.setState({ results: result.hits });
    });
  };
  pageIncr = currentPage => {
    this.setState({ page: currentPage + 1 });
  };
  onLoadMore = () => {
    this.pageIncr(this.state.page);
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const currentQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    // if (prevQuery !== currentQuery) {
    //   console.log('new request');
    //   this.setState({ page: 1 });
    //   return;
    // }
    console.log(prevQuery);
    console.log(currentQuery);
    console.log('same req', prevQuery === currentQuery);
    if (prevPage !== currentPage) {
      getImgs(currentQuery, currentPage)
        .then(result => {
          console.log('load req');
          const updatedResults = [...this.state.results, ...result.hits];
          this.setState({ results: updatedResults });
        })
        .catch(() => {
          alert('End of search');
        });
    }
  }
  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onFormSubmit}></Searchbar>
        <ImageGallery results={this.state.results}></ImageGallery>
        <Loader></Loader>
        <Button onClick={this.onLoadMore}></Button>
      </AppContainer>
    );
  }
}
