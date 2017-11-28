import React from 'react';

import { Route, Link } from 'react-router-dom';

import { base } from '../firebase/init';
import EditUser from './edit';
import ListUsers from './list';
import './css/users.css'

export default class UsersIndex extends React.Component {
	render() {
		return (
			<div>
				<label className="menu-label">Users</label>
				<Route exact path={`${this.props.match.url}`} component={ListUsers} />
				<Route path={`${this.props.match.url}/:id`} component={EditUser} />
			</div>
		);
	}
}
