import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import bugReducer from './Controller/Redux/bugSlice';
import authReducer from './Controller/Redux/authSlice';
import { Provider } from 'react-redux';
const storeReducer = combineReducers({ auth: authReducer });
const store = configureStore({
	reducer: storeReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
