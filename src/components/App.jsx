import { Component } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import getImgs from 'services/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    results: [],
    status: Status.IDLE,
    showModal: false,
    largeImage: {
      largeImageURL: '',
      largeImageAlt: '',
    },
  };
  onFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({ status: Status.PENDING });
    this.setState({ page: 1 });
    this.setState({ searchQuery });
    getImgs(searchQuery, this.state.page).then(result => {
      // console.log('form req');
      if (result.hits.length === 0) {
        alert('Found nothing');
        this.setState({ status: Status.REJECTED });
        return;
      }
      this.setState({ results: result.hits, status: Status.RESOLVED });
    });
  };
  pageIncr = currentPage => {
    this.setState({ page: currentPage + 1 });
  };
  onLoadMore = () => {
    this.pageIncr(this.state.page);
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    // const prevQuery = prevState.searchQuery;
    const currentQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    // if (prevQuery !== currentQuery) {
    //   console.log('new request');
    //   this.setState({ page: 1 });
    //   return;
    // }
    // console.log('prevpage', prevPage);
    // console.log('curpage', currentPage);
    // console.log('prevname', prevQuery);
    // console.log('curname', currentQuery);
    if (prevPage !== currentPage) {
      this.setState({ status: Status.PENDING });
      getImgs(currentQuery, currentPage)
        .then(result => {
          console.log('load req');
          const updatedResults = [...this.state.results, ...result.hits];
          this.setState({ results: updatedResults, status: Status.RESOLVED });
        })
        .catch(() => {
          this.setState({ status: Status.REJECTED });
          alert('End of search');
        });
    }
  }
  getBigImage = e => {
    const goalObj = this.state.results.filter(
      el => el.id === Number(e.target.id)
    );
    console.log(goalObj[0].largeImageURL);
    // console.log(e.currentTarget);
    this.setState({
      showModal: true,
      largeImage: {
        largeImageURL: goalObj[0].largeImageURL,
        largeImageAlt: goalObj[0].tags,
      },
    });
  };

  render() {
    const pending = this.state.status === 'pending';
    const resolved = this.state.status === 'resolved';
    const { largeImageURL, largeImageAlt } = this.state.largeImage;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onFormSubmit}></Searchbar>
        <ImageGallery
          onClick={this.getBigImage}
          results={this.state.results}
        ></ImageGallery>
        {pending && <Loader></Loader>}
        {this.state.results.length !== 0 && resolved && (
          <Button onClick={this.onLoadMore}></Button>
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.closeModal}
            imgUrl={largeImageURL}
            imgAlt={largeImageAlt}
          ></Modal>
        )}
      </AppContainer>
    );
  }
}
