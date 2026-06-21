import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';

class ServiceSummary extends Component {
  render() {
    const { serviceSummary } = this.props;

    return (
      <section className={styles.section} role="region" aria-label="Service summary">
        <h2 className={styles.sectionTitle}>Service summary</h2>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <p className={styles.summaryLabel}>Service</p>
            <p className={styles.summaryValue}>{serviceSummary.service}</p>
          </div>
          <div className={styles.summaryItem}>
            <p className={styles.summaryLabel}>Your Referrals</p>
            <p className={styles.summaryValue}>{serviceSummary.yourReferrals}</p>
          </div>
          <div className={styles.summaryItem}>
            <p className={styles.summaryLabel}>Active Referrals</p>
            <p className={styles.summaryValue}>{serviceSummary.activeReferrals}</p>
          </div>
          <div className={styles.summaryItem}>
            <p className={styles.summaryLabel}>Total Ref. Earnings</p>
            <p className={styles.summaryValue}>{serviceSummary.totalRefEarnings}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default ServiceSummary;