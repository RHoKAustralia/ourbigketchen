import React from 'react';

import { base } from '../firebase/init';
import { withRouter, Link } from 'react-router-dom';

export default withRouter(
	class EditUser extends React.Component {
		constructor(props) {
			super(props);

			this.state = {};
		}

		componentDidMount() {
			base
				.fetch(`users/${this.props.match.params.id}/profile`, {
					context: this,
				})
				.then(data => {
					this.setState({ profile: data });
				})
				.catch(error => {
					this.setState({
						error,
					});
				});
		}

		onChange(key, newValue) {
			console.log(newValue);

			this.setState(state => ({
				profile: {
					...state.profile,
					[key]: newValue,
				},
			}));
		}

		onTextboxChange(key, event) {
			const newValue = event.target.value;

			this.onChange(key, newValue);
		}

		onCheckboxChange(key, event) {
			const newValue = event.target.checked;

			this.onChange(key, newValue);
		}

		onSave(event) {
			event.preventDefault();

			base
				.update(`users/${this.props.match.params.id}/profile`, {
					data: { ...this.state.profile },
				})
				.then(() => {
					this.props.history.push('/users');
				})
				.catch(error => {
					this.setState({
						error,
					});
				});
		}

		render() {
			const profile = this.state.profile;

			return profile
				? <div className="edit-user-wrapper">
						{this.state.error && <div>Error: {this.state.error.message}</div>}
						| <Link className="back-link" to="/">Home</Link> | <Link to="/users">User List</Link> |
						<div className="edit-user-form">
							<div>
								<label>
									Display Name:{' '}
									<input type="text" value={profile.displayName} onChange={this.onTextboxChange.bind(this, 'displayName')} />
								</label>
							</div>
							<div>
								<label>
									Email:{' '}
									<input type="text" value={profile.email} onChange={this.onTextboxChange.bind(this, 'email')} />
								</label>
							</div>
							<div>
								<label>
									Mobile:{' '}
									<input type="text" value={profile.mobile} onChange={this.onTextboxChange.bind(this, 'mobile')} />
								</label>
							</div>
							<div>
								<label>
									D.O.B.:{' '}
									<input type="text" value={profile.dob} onChange={this.onTextboxChange.bind(this, 'dob')} />
								</label>
							</div>
							<div>
								<label>
									WWCN:{' '}
									<input type="text" value={profile.wwcn} onChange={this.onTextboxChange.bind(this, 'wwcn')} />
								</label>
							</div>
							<div>
								<label className="checkbox">
									<input
										type="checkbox"
										checked={profile.isAdmin}
										onChange={this.onCheckboxChange.bind(this, 'isAdmin')}
									/>
								Admin:{' '}
								</label>
							</div>
							<div>
								<label className="checkbox">
									<input
										type="checkbox"
										checked={profile.isSuperAdmin}
										onChange={this.onCheckboxChange.bind(this, 'isSuperAdmin')}
									/>
								Super Admin:{' '}
								</label>
							</div>
						</div>
						<button className="save-btn" onClick={this.onSave.bind(this)}>Save</button>
					</div>
				: <div>Loading...</div>;
		}
	}
);
