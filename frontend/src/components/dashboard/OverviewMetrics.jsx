import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';

class OverviewMetrics extends Component {
  render() {
    const { metrics } = this.props;

    return (
      <section className={styles.section} role="region" aria-label="Overview metrics">
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={metric.id || index} className={styles.metricItem}>
              <p className={styles.metricLabel}>{metric.label}</p>
              <p className={styles.metricValue}>{metric.value}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
}   

export default OverviewMetrics;