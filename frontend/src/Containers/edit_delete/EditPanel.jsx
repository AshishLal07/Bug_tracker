import './editPanel.css';

const EditPanel = ({ editClicked, deleteClicked, bugId }) => {
	return (
		<div className="bug_editPanel">
			<button onClick={editClicked}>Edit</button>
			<button onClick={() => deleteClicked(bugId)}>Delete</button>
		</div>
	);
};

export default EditPanel;
