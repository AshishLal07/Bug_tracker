import './bugBox.css';

const BugBox = ({ title, info }) => {
	return (
		<div className="bug__box">
			<p>{title}</p>
			<h5>{info}</h5>
		</div>
	);
};

export default BugBox;
