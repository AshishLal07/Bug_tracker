import './bugCard.css';
import Priority from '../../Controller/priorityController';

const BugCard = ({ bug, bugClicked }) => {
	function Clicked() {
		bugClicked(bug._id);
	}

	const { level, color } = Priority(bug.priority);
	return (
		<div className="bugcard__box" onClick={Clicked}>
			<div className="bugcard__box-heading">
				<h2>{bug.name}</h2>
			</div>

			<div className="bugcard__box-details">
				<div className="bugcard__box-rateing">
					<h4 style={{ backgroundColor: color }}>{level}</h4>
					<h5>{bug.version}</h5>
				</div>
				<p>{bug.creator}</p>
			</div>
		</div>
	);
};

export default BugCard;
