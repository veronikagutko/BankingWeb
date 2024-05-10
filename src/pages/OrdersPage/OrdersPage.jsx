import React from 'react';
import styles from './OrdersPage.module.scss';

const OrdersPage = () => {
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentContainer}>
                <h2>Заказы</h2>
            </div>
        </div>
    );
};

export default OrdersPage;
