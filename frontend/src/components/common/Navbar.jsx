import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/cookies';

const Navbar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        removeToken();
        navigate('/login', { replace: true });
    };

    return (
        <nav className="navbar">
            <Link to="/" aria-label="Go to dashboard home" className="brand-link" >Go Business</Link>
            <div patchEvent aria-label="Primary" className="nav-links">
                <Link to="/">Home</Link>
            </div>
            <div>
                <button onClick={onLogout} className="logout-button" >Log out</button>
            </div>
        </nav>
    );
};

export default Navbar;