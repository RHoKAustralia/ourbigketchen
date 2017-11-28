import React from 'react';

import { Route, Link } from 'react-router-dom';

import { base } from '../firebase/init';
import { withRouter } from 'react-router-dom';

export default withRouter(
	class ListUsers extends React.Component {
		constructor(props) {
			super(props);

			this.state = { users: [] };
		}

		componentDidMount() {
			base.bindToState('users', {
				context: this,
				state: 'users',
				asArray: true,
				keepKeys: true,
			});
		}

		render() {
			return (
				<div className="list-wrapper">
					| <Link className="back-link" to="/">Home</Link> |
					{this.state.error && <div>{this.state.error.message}</div>}
					<table>
						<thead>
							<tr>
								<th>Display Name</th>
								<th>Email</th>
								<th>Admin</th>
								<th>Super Admin</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{this.state.users.map(({ key, profile }) =>
								<tr key={key}>
									<td>{profile.displayName}</td>
									<td>{profile.email}</td>
									<td>{profile.isAdmin ? 'Y' : ''}</td>
									<td>{profile.isSuperAdmin ? 'Y' : ''}</td>
									<td>
										<Link to={`${this.props.match.url}/${key}`}>Edit</Link>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			);
		}
	}
);
