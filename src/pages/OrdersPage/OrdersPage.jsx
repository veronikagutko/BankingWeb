import React from 'react';
import styles from './OrdersPage.module.scss';
import OrdersTable from './OrdersTable/OrdersTable';

const OrdersPage = () => {
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentContainer}>
                <h2>Заказы</h2>

                <OrdersTable />
            </div>
        </div>
    );
};

export default OrdersPage;
