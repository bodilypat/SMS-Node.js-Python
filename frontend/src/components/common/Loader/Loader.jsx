//src/components/common/Loader/Loader.jsx 

import React from 'react';
import Proptypes from 'prop-types';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', color = 'primary', className = '' }) => {
    return (
        <div 
            className={`${styles.loader} ${styles[size]} ${styles[color]} ${className}`}
        />
    );
};

Loader.propTypes = {
    size: Proptypes.oneOf(['small', 'medium', 'large']),
    color: Proptypes.oneOf(['primary', 'secondary', 'tertiary']),
    className: Proptypes.string,
};

export default Loader;
