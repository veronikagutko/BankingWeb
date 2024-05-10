import React from 'react';
import styles from './NothingFound.module.scss';

const NothingFound = () => {
    return (
        <div className={styles.container}>
            <h2>Ничего не было найдено.<br />Попробуйте другие параметры</h2>
        </div>
    );
};

export default NothingFound;
