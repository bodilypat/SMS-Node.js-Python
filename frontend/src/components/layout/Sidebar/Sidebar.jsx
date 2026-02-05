//src/components/layout/Navbar.jsx 

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { faBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ brand = 'InventoryMS', links = [], user = null }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Brand / Logo */}
                <Link to="/" className={styles.brand}>
                    {brand}
                </Link>

                {/* Mobile menu toggle */}
                <button className={styles.menuToggle} onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <faBars />}
                </button>

                {/* Navigation Links */}
                <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
                    {links.map((link, index) => (
                        <Link key={index} to={link.path} className={styles.navLink} onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Optional user dropdown */}
                {user && (
                    <div className={styles.userMenu}>
                        <span className={styles.userLabel}>{user.name}</span>
                        <div className={styles.userDropdown}>
                            <Link to="/profile" className={styles.userDropdownItem}>Profile</Link>
                            <Link to="/settings" className={styles.userDropdownItem}>Settings</Link>
                            <Link to="/logout" className={styles.userDropdownItem}>Logout</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
