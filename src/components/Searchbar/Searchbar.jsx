import { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  static propTypes = {
    state: PropTypes.shape({
      searchQuery: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };
  getInputData = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      Notiflix.Notify.warning('Please, enter something.');
      // alert('Введите что-то');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    // this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.getInputData}
            value={this.state.searchQuery}
          ></SearchInput>
        </SearchForm>
      </SearchHeader>
    );
  }
}
