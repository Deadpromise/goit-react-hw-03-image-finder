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

  render() {
    return (
      <SearchHeader>
        <SearchForm>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></SearchInput>
        </SearchForm>
      </SearchHeader>
    );
  }
}
