import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import { setLogin } from '../../Controller/Redux/authSlice';
import './signIn.css';

const initialValue = {
	email: '',
	password: '',
};
const SignIn = () => {
	const [user, setUser] = useState(initialValue);
	// const [flag, setFlag] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function hasJWT(user, token) {
		localStorage.setItem('token', token);
		localStorage.setItem('userId', user._id);
	}

	const login = (values) => {
		axios
			.post('http://localhost:3500/auth/signIn', values, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((data) => {
				console.log(data);
				hasJWT(data.data.tempUser, data.data.token);

				dispatch(
					setLogin({
						user: data.data.tempUser,
						token: data.data.token,
					})
				);
				navigate('/home');
			});
	};

	function inputChanged(e) {
		console.log(e.target.name, e.target.value);
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
		login(user);
	}

	return (
		<div className="bt__signIn">
			<h1>Sign-In to Bug-Tracker</h1>
			<form>
				<label>Email</label>
				<input
					type="email"
					name="email"
					value={user.email}
					onChange={inputChanged}
				/>
				<label>Password</label>
				<input
					type="password"
					name="password"
					value={user.password}
					onChange={inputChanged}
				/>
				<button type="submit" onClick={handleSubmit}>
					SignIn
				</button>
				<div className="bt__signIn-signUp">
					<Link to="/">Don't have account? SignUp</Link>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
