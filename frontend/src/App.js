import './App.css';
// import { Bugs, Sidebar } from './Components/import';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import BugForm from './Containers/Create_Edit_Bug/BugForm';
// import DashBoard from './Components/dashBoard/DashBoard';
import SignUp from './Components/signUp/SignUp';
import SignIn from './Components/signIn/SignIn';
import HomePage from './Components/homePage/HomePage';
// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setLogin } from './Controller/Redux/authSlice';

function App() {
	// eslint-disable-next-line no-unused-vars
	// const dispatch = useDispatch();

	const [authToken, setAuthToken] = useState(false);
	useEffect(
		() =>
			// dispatch(
			// 	setLogin({
			// 		user: localStorage.getItem('userId'),
			// 		token: localStorage.getItem('token'),
			// 	})
			// ),
			setAuthToken(localStorage.getItem('token')),
		[]
	);

	// console.log(localStorage.getItem('user'));
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<SignUp />}></Route>
					<Route path="/login" element={<SignIn />}></Route>
					{
						<Route
							path="/home/*"
							element={authToken ? <HomePage /> : <SignIn />}
						></Route>
					}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
