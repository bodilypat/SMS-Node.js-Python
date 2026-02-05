//src/components/common/Table/Table.jsx 

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';

const Table = ({ columns, data, rowKey = 'id', sortable = false }) => {
    const [sortConfig, setSortConfig] = useState(null);

    const handleSort = (key) => {
        if (!sortable) return;

        let direction = 'ascending';
        if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {

        if (!sortConfig) return data;

        const { key, direction } = sortConfig;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    return (
        <div className="styles.tableWrapper">
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} onClick={() => handleSort(col.key)} className={sortable ? styles.sortable : ''}>
                                {col.title}
                                {sortable && sortConfig?.key === col.key && (
                                    <span className={styles.sortIndicator}>
                                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row) => (
                        <tr key={row[rowKey]}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            sortable: PropTypes.bool,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowKey: PropTypes.string,
    sortable: PropTypes.bool,
};

export default Table;
