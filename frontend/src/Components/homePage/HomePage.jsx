import './homepage.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Bugs from '../bugs/Bugs';
import BugForm from '../../Containers/Create_Edit_Bug/BugForm';
import DashBoard from '../dashBoard/DashBoard';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBugs } from '../../Controller/Redux/authSlice';

// import { Bugs, Sidebar } from './Components/import';

const HomePage = () => {
	const dispatch = useDispatch();
	// const [bugs, setBugData] = useState([]);
	const userId = localStorage.getItem('userId');
	const token = localStorage.getItem('token');

	useEffect(() => {
		// console.log(bugs);
		bugsApi();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const bugsApi = async () => {
		axios
			.get(`http://localhost:3500/getBugs/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				const data = res.data;
				dispatch(setBugs({ bugs: data }));
				// setBugData(data);
				console.log(data);
			});
	};

	return (
		<>
			<Sidebar />
			<div className="bt__container">
				<Routes>
					<Route path="/" element={<DashBoard />}></Route>
					<Route path="/bugs" element={<Bugs bugsApi={bugsApi} />}></Route>
					<Route
						path="/createBug"
						element={
							<div className="bugForm">
								<BugForm title="Create Bug" />
							</div>
						}
					></Route>
				</Routes>
				{/* <Route path='/createBug/edit' element={<BugForm title='Edit Bug' />} /> */}
			</div>
		</>
	);
};

export default HomePage;
