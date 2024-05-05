import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const {isAuthorized} = useSelector(state => state.auth);

	return (
	    <div className="App">
			<ToastContainer position='bottom-right' stacked />
			{isAuthorized ? <MainPage /> : <LoginPage />}
		</div>
	);
}

export default App;
