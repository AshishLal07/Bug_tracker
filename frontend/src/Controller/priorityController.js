const color = ['#ff0000', '#ff7f50', '#32cd32'];

const Priority = (priority) => {
	const level = ['high', 'medium', 'low'];
	return {
		level: level[priority - 1],
		color: color[priority - 1],
	};
};
export default Priority;
