import React, { Component } from 'react';

import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import OverviewMetrics from './OverviewMetrics';
import ServiceSummary from './ServiceSummary';
import ShareReferral from './ShareReferral';
import ReferralsTable from './ReferralsTable';
import Loader from '../common/Loader';

import { getReferrals } from '../../api/referrals';

import styles from '../../styles/Dashboard.module.css';

class Dashboard extends Component {
  state = {
    metrics: [],
    serviceSummary: {},
    referral: {},
    allReferrals: [],
    filteredReferrals: [],
    isLoading: true,
    errorMessage: '',
    searchQuery: '',
    sortOrder: 'desc',
  };

  componentDidMount() {
    this.fetchReferrals();
  }

  fetchReferrals = async (searchQuery = '', sortOrder = 'desc') => {
    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const response = await getReferrals(searchQuery, sortOrder);
      const data = response.data || response;
      const referrals = data.referrals || [];
      const sortedReferrals = [...referrals].sort((a, b) => new Date(b.data) - new Date(a.date));
      this.setState({
        metrics: data.metrics || [],
        serviceSummary: data.serviceSummary || {},
        referral: data.referral || {},
        allReferrals: referrals,
        isLoading: false,
        filteredReferrals: sortedReferrals,
      });
    } catch (error) {
      this.setState({ errorMessage: error.message, isLoading: false });
    }

  };

  onSearch = (searchQuery) => {
    const { allReferrals, sortOrder } = this.state;

    let filtered = allReferrals.filter((item) => {
      const name = item.name?.toLowerCase() || '';
      const service = item.serviceName?.toLowerCase() || '';

      return (
        name.includes(searchQuery.toLowerCase()) ||
        service.includes(searchQuery.toLowerCase())
        );
      });

      filtered.sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);

        return sortOrder === 'asc'
          ? d1 - d2
          : d2 - d1;
      });

      this.setState({
        searchQuery,
        filteredReferrals: filtered,
      });
  };

  onSort = (sortOrder) => {
    const { searchQuery, allReferrals } = this.state;

    let filtered = allReferrals.filter((item) => {
      const name = item.name?.toLowerCase() || '';
      const service = item.serviceName?.toLowerCase() || '';

      return (
        name.includes(searchQuery.toLowerCase()) ||
        service.includes(searchQuery.toLowerCase())
      );
    });

    filtered.sort((a, b) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);

      return sortOrder === 'asc'
        ? d1 - d2
        : d2 - d1;
    });

    this.setState({
      sortOrder,
      filteredReferrals: filtered,
    });
  };

  render() {
    const {
      metrics,
      serviceSummary,
      referral,
      filteredReferrals,
      isLoading,
      errorMessage,
    } = this.state;
    return (
      <div>
        <Navbar />
        <main className={styles.dashboardContainer}>
          <header className={styles.header}>
            <h1 className={styles.mainTitle}>Referral Dashboard</h1>
            <p className={styles.subtitle}>Track your referrals, earnings, and partner activity in one place.</p>
          </header>

          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <div role="alert"   className={styles.errorContainer}>
              <p>{errorMessage}</p>
            </div>
          ) : (
            <>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <OverviewMetrics metrics={metrics} />
              </section>

              <section className={styles.section}>
                <ServiceSummary serviceSummary={serviceSummary} />
              </section>

              <section className={styles.section}>
                <ShareReferral referral={referral} />
              </section>

              <section className={styles.section}>
                <ReferralsTable
                  referrals={filteredReferrals}
                  onSearch={this.onSearch}
                  onSort={this.onSort}
                />
              </section>
            </>
          )}
        </main>
        <Footer />
      </div>
    )
  }
}       

export default Dashboard;