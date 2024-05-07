import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { STORAGE_KEYS } from './constants/SessionStorageKeys';
import { AuthActions } from './store/slices/AuthSlice/AuthSlice';

const App = () => {
	const {isAuthorized} = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		const tokenValidity = sessionStorage.getItem(STORAGE_KEYS.validTo) ? new Date(sessionStorage.getItem(STORAGE_KEYS.validTo)) : null;

		if (tokenValidity && tokenValidity > Date.now()) {
			dispatch(AuthActions.setAuthorized(true));
		} else {
			sessionStorage.clear();
		}
	}, []);

	return (
	    <div className="App">
			<ToastContainer position='bottom-right' stacked />
			{isAuthorized ? <MainPage /> : <LoginPage />}
		</div>
	);
}

export default App;
