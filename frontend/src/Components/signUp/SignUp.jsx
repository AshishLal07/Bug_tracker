import { useState } from 'react';
import './signUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialValue = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	location: '',
	occupation: '',
};

const SignUp = () => {
	const [newUser, setNewUser] = useState(initialValue);
	const navigate = useNavigate();

	const registerUser = async (user) => {
		const formData = new FormData();

		for (let value in user) {
			// console.log(value, user[value]);
			formData.append(value, user[value]);
		}
		axios
			.post('http://localhost:3500/auth/signUP', formData, {
				headers: { 'Content-type': 'application/json' },
			})
			.then((data) => {
				console.log(data);
				return navigate('/login');
			});

		// 	const savedUserResponse = await fetch('http://localhost:3500/auth/login', {
		// 		method: 'POST',
		// 		body: formData,
		// 	});
		// 	const savedUser = await savedUserResponse.json();
		// 	if (savedUser) {
		// 		navigate('/login');
		// 	}
	};

	function inputChanged(e) {
		if (e.target.file) {
			console.log(true);
		}
		console.log();
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	}
	function handleFormSubmit(e) {
		e.preventDefault();
		// console.log(newUser, e.target.value);
		registerUser(newUser);
	}
	return (
		<div className="bt__signup">
			<h1>Join in BugTracker</h1>
			<form>
				<label>First Name</label>
				<input
					type="text"
					name="firstName"
					value={newUser.firstName}
					onChange={inputChanged}
				/>
				<label>Last Name</label>
				<input
					type="text"
					name="lastName"
					value={newUser.lastName}
					onChange={inputChanged}
				/>
				<label>Email</label>
				<input
					type="text"
					name="email"
					value={newUser.email}
					onChange={inputChanged}
				/>
				<label>Occupation</label>
				<input
					type="text"
					name="occupation"
					value={newUser.occupation}
					onChange={inputChanged}
				/>
				<label>Location</label>
				<input
					type="text"
					name="location"
					value={newUser.location}
					onChange={inputChanged}
				/>
				<label>Password</label>
				<input
					type="password"
					name="password"
					value={newUser.password}
					onChange={inputChanged}
				/>
				<button type="submit" onClick={handleFormSubmit}>
					Sign-Up
				</button>
				<div className="bt__signup-login">
					<Link to="/login">Already have Account. Login!</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
