import './bugForm.css';
import { useState } from 'react';
import bugModel from '../../Model/bugModel';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { setBugs } from '../../Controller/Redux/authSlice';

// const initialstate = {
// 	name: '',
// 	details: '',
// 	steps: '',
// 	version: '',
// 	priority: '',
// 	assigned: '',
// 	creator: '',
// };

const BugForm = (props) => {
	const [bugData, setBugData] = useState(new bugModel(props.bug));
	// const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = localStorage.getItem('userId');
	const token = localStorage.getItem('token');
	const createBug = async (Bug) => {
		// console.log(bugData, token;
		axios
			.post(`http://localhost:3500/createBug/${userId}`, bugData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				dispatch(setBugs({ bugs: res.data }));
				navigate('/home');
			});
	};
	const updateBug = async () => {
		axios
			.post(`http://localhost:3500/updateBug/${bugData._id}`, bugData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
			});
	};

	function inputChanged(e) {
		setBugData({
			...bugData,
			[e.target.name]: e.target.value,
		});
	}

	function handleBugSubmit(e) {
		e.preventDefault();
		console.log(props.title);
		if (props.title === 'Edit Bug') {
			updateBug();
		}
		createBug(bugData);
	}

	return (
		<div className="bug__form">
			<h1>{props.title}</h1>
			<form action="">
				<label>Name</label>
				<input
					type="text"
					name="name"
					placeholder="Bug Name..."
					required
					onChange={inputChanged}
					value={bugData.name}
				/>
				<label>Details</label>
				<input
					type="text"
					name="details"
					placeholder="Detail description on the bug"
					required
					onChange={inputChanged}
					value={bugData.details}
				/>
				<label>Steps</label>
				<input
					type="text"
					name="steps"
					placeholder="steps to recreate a bug"
					required
					onChange={inputChanged}
					value={bugData.steps}
				/>
				<label>Priority</label>
				<select
					name="priority"
					onChange={inputChanged}
					// value={bugData.priority}
				>
					<option selected disabled>
						{' '}
						-- select an option --{' '}
					</option>
					<option value="1"> High</option>
					<option value="2">Medium</option>
					<option value="3">Low</option>
				</select>
				<label>Creator</label>
				<input
					type="text"
					name="creator"
					placeholder="Creator"
					required
					onChange={inputChanged}
					// value={bugData.creator}
				/>
				<label>Assigned</label>
				<select
					name="assigned"
					onChange={inputChanged}
					value={bugData.assigned}
				>
					<option selected disabled>
						-- select an option --
					</option>
					<option value={'ashish'}>Ashish</option>
					<option value={'fakeperson'}>fakeperson</option>
				</select>
				<label>Application version</label>
				<input
					type="text"
					name="version"
					placeholder="Application version"
					required
					onChange={inputChanged}
					value={bugData.version}
				/>
				<button type="submit" onClick={handleBugSubmit}>
					{props.title}
				</button>
			</form>
		</div>
	);
};

export default BugForm;
