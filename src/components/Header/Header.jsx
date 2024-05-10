import React from 'react';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../store/slices/AuthSlice/AuthSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(AuthActions.setAuthorized(false));
        navigate(-1, {relative: 'route'});
    };

    return (
        <header className={styles.header}>
            <Logo color="#FFFFFF" />

            <nav className={styles.navbar}>
                <Link to="activity">Активность</Link>
                <Link to="messages">Сообщения</Link>
                <Link to="orders">Заказы</Link>
                <Link onClick={() => handleLogout()}>Выйти</Link>
            </nav>
        </header>
    );
};

export default Header;
