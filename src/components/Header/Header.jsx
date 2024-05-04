import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Header = () => {
    return (
        <header className={styles.header}>
            <Logo color="#FFFFFF" />

            <nav className={styles.navbar}>
                <Link to="activity">Активность</Link>
                <Link to="messages">Сообщения</Link>
                <Link to="orders">Заказы</Link>
            </nav>
        </header>
    );
};

export default Header;
