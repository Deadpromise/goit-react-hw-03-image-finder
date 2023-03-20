import { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import getImgs from 'services/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  static propTypes = {
    state: PropTypes.shape({
      searchQuery: PropTypes.string.isRequired,
      page: PropTypes.number.isRequired,
      results: PropTypes.arrayOf(PropTypes.shape({})),
      status: PropTypes.string,
      showModal: PropTypes.bool,
      largeImage: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        largeImageAlt: PropTypes.string.isRequired,
      }),
    }),
  };
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
    // if (this.state.searchQuery !== searchQuery) {

    // }
    this.setState({ page: 1 });
    this.setState({ status: Status.PENDING });
    // this.setState({ page: 1 });
    this.setState({ searchQuery });
    getImgs(searchQuery, this.state.page).then(result => {
      // console.log('form req');
      if (result.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        // alert('Found nothing');
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
          // console.log('load req');
          if (result.hits.length === 0) {
            this.setState({ status: Status.REJECTED });
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
            return;
          }
          const updatedResults = [...this.state.results, ...result.hits];
          this.setState({ results: updatedResults, status: Status.RESOLVED });
        })
        .catch(() => {
          this.setState({ status: Status.REJECTED });
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          // alert('End of search');
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
    const showBtn = this.state.results.length < 12;
    const { largeImageURL, largeImageAlt } = this.state.largeImage;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onFormSubmit}></Searchbar>
        <ImageGallery
          onClick={this.getBigImage}
          results={this.state.results}
        ></ImageGallery>
        {pending && <Loader></Loader>}
        {this.state.results.length !== 0 && resolved && !showBtn && (
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
