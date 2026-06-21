import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  searchTimeout = null;

  onChangeSearch = (event) => {
      const searchQuery = event.target.value;

      this.setState({ searchQuery });

      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
          this.props.onSearch(searchQuery);
      }, 300);
  };

  render() {
    return (
      <input
        type="search"
        placeholder="Name or service…"
        value={this.state.searchQuery}
        onChange={this.onChangeSearch}
        className={styles.searchInput}
        aria-label="Search referrals"
      />
    )
  }
}

export default SearchBar;