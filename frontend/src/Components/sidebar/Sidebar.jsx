import './sidebar.css';
import { FaHome, FaBug } from 'react-icons/fa';
import { IoMdBug, IoIosHelpCircle } from 'react-icons/io';
import { AiFillSetting } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

// import logo from '../../Assets/logo.png';
const Sidebar = () => {
	const style = { fontSize: '1.5em', paddingRight: '15px' };
	const logoStyle = {
		fontSize: '2.5em',
		transform: 'rotate(45deg)',
		color: '#800000',
		marginRight: '10px',
	};
	return (
		<div className="bt__sidebar">
			<div className="bt__sidebar-links">
				<div className="bt__sidebar-links_logo">
					<IoMdBug style={logoStyle} />
					<h1> Bugs Tracker</h1>
				</div>
				<div className="bt__sidebar-links_container">
					<p>
						<MdDashboard style={style} />
						<Link to="/home">DashBoard</Link>
					</p>
					<p>
						<FaHome style={style} />
						<Link to="/home/bugs">BUGS</Link>
					</p>
					<p>
						<FaBug style={style} />
						<Link to="/home/createBug">CREATE BUG</Link>
					</p>

					<p>
						<AiFillSetting style={style} />
						<a href="#support">SUPPORT</a>
					</p>
					<p>
						<IoIosHelpCircle style={style} />
						<a href="#help">HELP</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
