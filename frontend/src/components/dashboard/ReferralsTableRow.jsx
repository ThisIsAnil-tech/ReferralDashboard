import React, { Component } from 'react';
import styles from '../../styles/Dashboard.module.css';
import { formatDate, formatCurrency } from '../../utils/formatters';

class ReferralsTableRow extends Component {
  render() {
    const { referral, onRowClick } = this.props;
    const { id, name, serviceName, date, profit } = referral;

    return (
      <tr className={styles.tableRow} onClick={() => onRowClick(id)}>
        <td>{name}</td>
        <td>{serviceName}</td>
        <td>{formatDate(date)}</td>
        <td>{formatCurrency(profit)}</td>
      </tr>
    )
  }
}   

export default ReferralsTableRow;