import React from 'react';
import './css/home.css';

import { Link } from 'react-router-dom';

export default function Home(props) {
	return (
		<div className="home-wrapper">
			<label className="home-label menu-label">Home</label>
			<ul className="home-nav">
				<div><Link to="/events" className="link home-events"><li className="events-list list-thing">Events</li></Link></div>
				<div><Link to="/users" className="link home-users"><li className="users-list list-thing">Users</li></Link></div>
				<div><Link to="/reports" className="link home-reports"><li className="reports-list list-thing">Reports</li></Link></div>
			</ul>
		</div>
	);
}
