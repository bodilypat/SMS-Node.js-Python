//src/features/common/Input/Input.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({
    label,
    name,
    type = 'text',
    value,
    placeholder,
    onChange,
    onBlur,
    error,
    disabled = false,
    size = 'medium',
    className = '',
    ...rest
}) => {
    return (
        <div className={`${styles.inputContainer} ${className}`}>
            {label && <label htmlFor={name} className={styles.label}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`${styles.input} ${error ? styles.error : ''} ${styles[size]}`}
                {...rest}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
};

export default Input;
