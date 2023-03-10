import './bugDetails.css';
import BugBox from './container/BugBox';
// import { useDispatch } from 'react-redux';
// import { markComplete } from '../../Controller/Redux/bugSlice';
import EditPanel from '../edit_delete/EditPanel';
import { useState } from 'react';
import EditBug from '../Create_Edit_Bug/BugForm';
import { RiCloseFill } from 'react-icons/ri';
import Priority from '../../Controller/priorityController';

const BugDetails = ({ bug, deleteClicked }) => {
	const { level } = Priority(bug[0].priority);
	const styleCross = {
		fontSize: '1.5rem',
		position: 'absolute',
		right: '5px',
		top: '5px',
		cursor: 'pointer',
	};
	// const dispatch = useDispatch();
	const [displayEdit, setDisplayEdit] = useState(false);

	function editClicked() {
		setDisplayEdit(!displayEdit);
	}

	return (
		<>
			<div className="bug__details">
				<div className="bug__details-heading">
					<h3>{bug[0].name}</h3>
				</div>
				<div className="bug__details-content">
					<BugBox title={'Details'} info={bug[0].details} />
					<BugBox title={'Steps'} info={bug[0].steps} />
					<BugBox title={'Priority'} info={level} />
					<BugBox title={'Creator'} info={bug[0].creator} />
					<BugBox title={'Assigned'} info={bug[0].assigned} />
					<BugBox title={'App Version'} info={bug[0].version} />
				</div>
				<div className="bug__details-btns">
					<EditPanel
						editClicked={editClicked}
						deleteClicked={deleteClicked}
						bugId={bug[0]._id}
					/>
					<button className="btn_complete" type="submit">
						Mark Complelte
					</button>
				</div>
			</div>
			{displayEdit && (
				<div className="editBug">
					<RiCloseFill style={styleCross} onClick={editClicked} />
					<EditBug title="Edit Bug" bug={bug[0]} />
				</div>
			)}
		</>
	);
};

export default BugDetails;
