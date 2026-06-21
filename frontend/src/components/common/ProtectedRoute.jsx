import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/cookies';

class ProtectedRoute extends Component {
  render() {
    const { children } = this.props;
    const token = getToken();
    
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  }
}

export default ProtectedRoute;