import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { signIn } from '../../api/auth';
import { setToken, getToken } from '../../utils/cookies';

import styles from '../../styles/Login.module.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: '',
        redirectToDashboard: false,
    }

    onChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    onClickSignIn = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            const response = await signIn(email, password);
            const token = response.data.token;
            setToken(token);
            this.setState({ redirectToDashboard: true, errorMessage: '' });
        } catch (error) {
            this.setState({ errorMessage: error.message || 'Invalid email or password' });
        }
    }

    render() {
        const { email, password, errorMessage } = this.state;
        if (getToken() || this.state.redirectToDashboard) {
            return <Navigate to="/" replace />;
        }

        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <h1 className={styles.brandTitle}>Go Business</h1>
                    <p className={styles.tagline}>Sign in to open your referral dashboard.</p>
                    {errorMessage && (
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    )}
                    <form onSubmit={this.onClickSignIn} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Anil@domain.com"
                                value={email}
                                onChange={this.onChangeEmail}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Anil@123"
                                value={password}
                                onChange={this.onChangePassword}
                                className={styles.input}
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.signInButton}
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;