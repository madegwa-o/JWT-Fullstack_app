import styles from './Navbar.module.css'
import UserService from '../../service/UserService';
import { Link } from 'react-router-dom';
function Navbar() {

    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Am i really boring');
        if(confirmDelete){
            UserService.logout();
        }
    };

    return (
        <nav className={styles.nav}>
            <ul>
                {!isAuthenticated && <li><Link to="/">Go Home</Link></li>}
                {isAuthenticated && <li><Link to="/profile">profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">Users</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>logout</Link></li>}
            </ul>
        </nav>
    )
}

export default Navbar;