import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Loader from '../common/Loader';
import ReferralNotFound from './ReferralNotFound';

import { getReferralById } from '../../api/referrals';
import { formatDate, formatCurrency } from '../../utils/formatters';

import styles from '../../styles/ReferralDetails.module.css';

class ReferralDetail extends Component {
  state = {
    referral: null,
    isLoading: true,
    isNotFound: false,
    errorMessage: '',
  };

  async componentDidMount() {
    const { id } = this.props.params;

    try {
      const response = await getReferralById(id);
      const data = response.data || response;

      let referral = null;

      if (data.id && data.name) {
        referral = data;
      } else if (data.referrals && Array.isArray(data.referrals)) {
        referral = data.referrals.find(r => String(r.id) === String(id));
      } else if (data.data) {
        if (data.data.id && data.data.name) {
          referral = data.data;
        } else if (data.data.referrals) {
          referral = data.data.referrals.find(r => String(r.id) === String(id));
        }
      }

      if (referral) {
        this.setState({ referral, isLoading: false });
      } else {
        this.setState({ isNotFound: true, isLoading: false });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, isLoading: false });
    }
  }

  render() {
    const { referral, isLoading, isNotFound, errorMessage } = this.state;
    const { id, date, profit, name, serviceName } = referral || {};

    return (
      <div>
        <Navbar />
        <main className={styles.detailsContainer}>
          {isLoading && <Loader />}
          {errorMessage && <div className={styles.errorState}>{errorMessage}</div>}
          {isNotFound && <ReferralNotFound />}
          {referral && (
            <>
              <h1 className={styles.pageTitle}>Referral Details</h1>
              <div className={styles.detailsCard}>
                <h2 className={styles.partnerName}>{name}</h2>
                <dl className={styles.detailsList}>
                  <div>
                    <dt className={styles.detailLabel}>Referral ID</dt>
                    <dd className={styles.detailValue}>{id}</dd>
                  </div>
                  <div>
                    <dt className={styles.detailLabel}>Service Name</dt>
                    <dd className={styles.detailValue}>{serviceName}</dd>
                  </div>
                  <div>
                    <dt className={styles.detailLabel}>Date</dt>
                    <dd className={styles.detailValue}>{formatDate(date)}</dd>
                  </div>
                  <div>
                    <dt className={styles.detailLabel}>Profit</dt>
                    <dd className={`${styles.detailValue} ${styles.profit}`}>
                      {formatCurrency(profit)}
                    </dd>
                  </div>
                </dl>
              </div>
              <Link to="/" className={styles.backLink} aria-label="Back to dashboard" >Back to dashboard</Link>
            </>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

function ReferralDetails(props) {
  return <ReferralDetail {...props} params={useParams()} />;
}

export default ReferralDetails;