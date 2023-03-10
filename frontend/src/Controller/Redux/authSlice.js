import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = {
	user: null,
	token: null,
	bugs: [],
};

// const BugsApi = createApi({
// 	reducerPath:'bugsApi',
// 	baseQuery:fetchBaseQuery({
// 		baseUrl:`http://localhost:3500/getBugs/${auth.user._id}`
// 	})
// })

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogut: (state) => {
			state.user = null;
			state.token = null;
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.log('user not existed');
			}
		},
		setBugs: (state, action) => {
			state.bugs = action.payload.bugs;
		},
		setBug: (state, action) => {
			const updatedBugs = state.bugs.filter(
				(bug) => bug.id === action.payload.bug_id
			);
			// const updatedBugs = state.bugs.map((bug) => {
			// 	if (bug.id === action.payload.bug_id) {
			// 		return action.payload.bug;
			// 	}

			// });
			state.bugs = updatedBugs;
		},
	},
});

export const { setLogin, setLogut, setFriends, setBug, setBugs } =
	authSlice.actions;
export default authSlice.reducer;
