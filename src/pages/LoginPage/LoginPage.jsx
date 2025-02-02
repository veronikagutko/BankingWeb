import React, {useState, useEffect} from 'react';
import styles from './LoginPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AuthEffects } from '../../store/slices/AuthSlice/AuthSlice';
import Logo from '../../components/Logo/Logo';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.auth);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);

    const handleAuthorize = () => {
        dispatch(AuthEffects.authorize({name, password}))
            .unwrap()
            .catch((err) => {
                console.log(err);
                toast.error('Произошла ошибка. Повторите запрос позже');
            });
    };

    useEffect(() => {
        if (name.length > 0 && password.length > 0) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [name, password]);

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentContainer}>
                <Logo color="#147e4b" />

                <div className={styles.formContainer}>
                    <div className={styles.inputContainer}>
                        <input value={name} onChange={(event) => setName(event.target.value)} id="name" type="text" />
                        <label htmlFor="name">Имя</label>
                    </div>
                    <div className={styles.inputContainer}>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} id="password" type="password" />
                        <label htmlFor="password">Пароль</label>
                    </div>

                    <Link to="activity" disabled={isSubmitDisabled || isLoading} onClick={handleAuthorize} className={styles.submitButton}>
                        {isLoading ? <div className={styles.loader}/> : <span>Войти</span>}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
