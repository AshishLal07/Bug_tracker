import DashCard from '../../Containers/DashBoardCard/DashCard';
import './dashBoard.css';
import { useSelector } from 'react-redux';
// import { getBugs } from '../../Controller/Redux/bugSlice';
// import { useEffect } from 'react';

const DashBoard = () => {
	// const dispatch = useDispatch();
	const bugs = useSelector((state) => state.auth.bugs);
	// console.log(bugs);
	let highCount = 0;
	let medCount = 0;
	let lowCount = 0;
	if (bugs !== undefined) {
		highCount = filterBugs(1);
		medCount = filterBugs(2);
		lowCount = filterBugs(3);
	}
	function filterBugs(priority) {
		return bugs.filter((bug) => {
			return bug.priority === priority;
		});
	}

	// useEffect(() => {
	// 	dispatch(getBugs());
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [bugs === undefined]);

	return (
		<div className="bt__dashboard-container">
			<DashCard priority="1" count={highCount.length} />
			<DashCard priority="2" count={medCount.length} />
			<DashCard priority="3" count={lowCount.length} />
		</div>
	);
};

export default DashBoard;
