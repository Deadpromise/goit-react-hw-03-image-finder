import { Component } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  getInputData = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };
  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert('Введите что-то');
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
