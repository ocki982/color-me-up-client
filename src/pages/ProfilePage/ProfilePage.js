import "./ProfilePage.scss";
import { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

class ProfilePage extends Component {
    state = {
        user: null,
        failedAuth: false
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token) {
            this.setState({ failedAuth: true });
            return;
        }

        // Get the data from the API
        axios
            .get('http://localhost:4000/posts/user/all', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                this.setState({
                    user: response.data
                });
            })
            .catch(() => {
                this.setState({
                    failedAuth: true
                })
            });
    }

    handleLogout = () => {
        localStorage.removeItem("token");
        this.setState({
            user: null,
            failedAuth: true
        })
    };

    renderMessages = () => {
		return this.state.user.map(({ text }, index) => (
			<div key={index}>
				<h3 className="profile__name">
					<span className="profile__text">{text}</span>
				</h3>
			</div>
		))
	}



    render() {
        if (this.state.failedAuth) {
            return (
                <main className="profile">
                    <p>You must be logged in to see this page. <Link to="/">Log in</Link></p>
                </main>
            )
        }

        if (!this.state.user) {
            return (
                <main className="profile">
                    <p>Loading...</p>
                </main>
            )
        }

        const { user } = this.state.user[0];

        return (
            <div>
                <Header/>
                <main className="profile">
                    <h1 className="profile__title">Profile</h1>
                    <p>
                        Welcome back, {user}!
                    </p>
                    <h2 className="profile__dash">My Messages</h2>
                    {this.renderMessages()}


                    <button className="profile__logout" onClick={this.handleLogout}>
                        Log out
                    </button>
                </main>
            </div>
        );
    }
}

export default ProfilePage;
