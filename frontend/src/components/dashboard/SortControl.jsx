import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';

class SortControl extends Component {
  state = {
    sortOrder: 'desc', 
  };

  onChangeSortOrder = (event) => {
    const sortOrder = event.target.value;
    this.setState({ sortOrder });
    this.props.onSort(sortOrder); 
  };

  render() {
    return (
      <label className={styles.sortLabel}>
        Sort by date:
        <select
          value={this.state.sortOrder}
          onChange={this.onChangeSortOrder}
          className={styles.sortControl}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </label>
    )
  }
}   

export default SortControl;