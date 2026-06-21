import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';

class ShareReferral extends Component {
  copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  render() {
    const { referral } = this.props;

    return (
      <section className={`${styles.section} ${styles.shareSection}`} role="region" aria-label="Share referral">
        <h2 className={styles.sectionTitle}>Refer friends and earn more</h2>
        <div className={styles.shareGrid}>
          <div className={styles.shareItem}>
            <p className={styles.shareLabel}>Your Referral Link</p>
            <input
              type="text"
              value={referral.link}
              readOnly
              className={styles.shareInput}
            />
            <button
              className={styles.copyButton}
              onClick={() => this.copyToClipboard(referral.link)}
            >
              Copy
            </button>
          </div>
          <div className={styles.shareItem}>
            <p className={styles.shareLabel}>Your Referral Code</p>
            <input
              type="text"
              value={referral.code}
              readOnly
              className={styles.shareInput}
            />
            <button
              className={styles.copyButton}
              onClick={() => this.copyToClipboard(referral.code)}
            >
              Copy
            </button>
          </div>
        </div>
      </section>
    )
  }
}

export default ShareReferral;