import './App.scss';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useSelector } from 'react-redux';

const App = () => {
	const {isAuthorized} = useSelector(state => state.auth);

	return (
	    <div className="App">
			{isAuthorized ? <MainPage /> : <LoginPage />}
		</div>
	);
}

export default App;
