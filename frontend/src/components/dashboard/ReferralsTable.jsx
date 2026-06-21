import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ReferralsTableRow from './ReferralsTableRow';
import SearchBar from './SearchBar';
import SortControl from './SortControl';
import Pagination from './Pagination';
import styles from '../../styles/Dashboard.module.css';

class ReferralsTables extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 10,
  };

  onPageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  onRowClick = (id) => {
    this.props.navigate(`/referral/${id}`);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.referrals !== this.props.referrals) {
      this.setState({ currentPage: 1 });
    }
  }

  render() {
    const { referrals, onSearch, onSort } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageReferrals = referrals.slice(startIndex, endIndex);

    return (
      <section className={styles.section} role="region" aria-label="All referrals">
        <h2 className={styles.sectionTitle}>All referrals</h2>

        <div className={styles.controlsWrapper}>
          <SearchBar onSearch={onSearch} />
          <SortControl onSort={onSort} />
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.referralsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {currentPageReferrals.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.emptyState}>
                    No matching entries
                  </td>
                </tr>
              ) : (
                currentPageReferrals.map((referral) => (
                  <ReferralsTableRow
                    key={referral.id}
                    referral={referral}
                    onRowClick={this.onRowClick}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={referrals.length}
          itemsPerPage={itemsPerPage}
          onPageChange={this.onPageChange}
        />
      </section>
    );
  }
}

function ReferralsTable(props) {
  const navigate = useNavigate();
  return <ReferralsTables {...props} navigate={navigate} />;
}

export default ReferralsTable;