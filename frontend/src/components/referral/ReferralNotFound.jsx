import { Link } from 'react-router-dom';

const ReferralNotFound = () => {
    return (
        <div className="referral-not-found-container">
            <h1>Referral not found</h1>
            <Link to="/">Back to dashboard</Link>
        </div>
    );
}

export default ReferralNotFound;