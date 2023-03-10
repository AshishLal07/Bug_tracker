import './dashCard.css';
import Priority from '../../Controller/priorityController';

const DashCard = (props) => {
	const { level, color } = Priority(props.priority);

	return (
		<div className="bt__card" style={{ color: color }}>
			<h2>Total: {level}</h2>
			<p>{props.count}</p>
		</div>
	);
};

export default DashCard;
