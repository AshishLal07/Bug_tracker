import './bugs.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import BugCard from '../../Containers/BugCard/BugCard';
import { useEffect, useState } from 'react';
import BugDetails from '../../Containers/BugDetails/BugDetails';
import { setBugs } from '../../Controller/Redux/authSlice';

const Bugs = ({ bugsApi }) => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.auth.bugs);

	const userId = localStorage.getItem('userId');
	const token = localStorage.getItem('token');

	const [bugs, setBugData] = useState(data || []);
	const [search, setSearch] = useState('');
	const [displayBug, setDisplayBug] = useState({
		id: '',
		isDisplayed: false,
	});

	useEffect(() => {
		// console.log(data);
		setBugData(data);
	}, [data]);

	const filterData = async (priority) => {
		if (data) {
			const filterBugs = data.filter(
				(bug) => bug.priority === Number(priority)
			);
			setBugData(filterBugs);
		}
	};
	const filterSearch = (searchVal) => {
		const filterbug = bugs.filter((bug) => {
			return bug.creator === searchVal;
		});

		if (filterbug.length > 0) {
			setBugData(filterbug);
		} else {
			setBugData(bugs);
		}

		if (searchVal === '') {
			setBugData(data);
		}
	};

	const filterClicked = (e) => {
		filterData(e.target.value);
	};
	function deleteClicked(bugId) {
		axios
			.get(`http://localhost:3500/deleteBugs/${userId}/${bugId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setDisplayBug(!displayBug.isDisplayed);
				setBugData(res.data);
				dispatch(setBugs({ bugs: res.data }));
			});
	}
	const bugClicked = (bugId) => {
		// console.log(bugId);
		setDisplayBug({
			id: bugId,
			isDisplayed: !displayBug.isDisplayed,
		});
	};

	const handleInputChange = (e) => {
		// console.log(e.target.value);
		setSearch(e.target.value);
		filterSearch(e.target.value);
	};

	return (
		<div className="bt__bug section__margin">
			<div className="bt__bug-section">
				<h4>Home &gt; All Bugs</h4>
			</div>
			<div className="bt_bug-heading">
				<h1>Bugs</h1>
				<div className="bt_bug-query">
					<div className="bt_bug-filter">
						<select onChange={filterClicked}>
							<option selected disabled>
								{' '}
								Priority
							</option>
							<option value={1}> High</option>
							<option value={2}> Medium</option>
							<option value={3}> Low</option>
						</select>
					</div>
					<div className="bt_bug-search">
						<div className="bt_bug-search_icon">
							<FaSearch style={{ color: 'gray' }} />
						</div>
						<input
							type="text"
							value={search}
							onChange={handleInputChange}
							placeholder="Search By Creator..."
						/>
					</div>
				</div>
			</div>

			<hr></hr>
			<div className="bt__bug-manager">
				<div className="bt__bug-content">
					{bugs.map((bug, index) => (
						<BugCard
							key={index}
							bug={bug}
							// deleteClicked={deleteClicked}
							bugClicked={bugClicked}
						/>
					))}
				</div>
				<div className="bt__bug-details">
					<p className="box">Bug Details</p>
					{displayBug.isDisplayed ? (
						<BugDetails
							bug={bugs.filter((bug) => {
								return bug._id === displayBug.id;
							})}
							deleteClicked={deleteClicked}
						/>
					) : (
						<p className="empty">Create a New Bug...</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Bugs;
