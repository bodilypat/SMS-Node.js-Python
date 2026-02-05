//src/components/layout/Footer/Footer.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';

const Footer = ({ brand = 'InventoryMS', links = [] }) => {
    const year =  new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.brand}>
                <span>{brand} &copy; {year}</span>

                {links.length > 0 && (
                    <div className={styles.links}>
                        {links.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
};

Footer.propTypes = {
    brand: PropTypes.string,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
};

export default Footer;  
