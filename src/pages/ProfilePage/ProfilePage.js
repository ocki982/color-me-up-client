import "./ProfilePage.scss";
import { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

class ProfilePage extends Component {
    state = {
        post: null,
        user: "",
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
                    post: response.data
                });
            })
            .catch(() => {
                this.setState({
                    failedAuth: true
                })
            });
        axios
            .get('http://localhost:4000/users/current', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                this.setState({
                    user: response.data.username
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
            post:null,
            user: "",
            failedAuth: true
        })
    };

    renderMessages = () => {
		return this.state.post.map(({ text }, index) => (
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

        if (!this.state.post) {
            return (
                <main className="profile">
                    <p>Loading...</p>
                </main>
            )
        }

        return (
            <div>
                <Header/>
                <main className="profile">
                    <h1 className="profile__title">Profile</h1>
                    <p>
                        Welcome back, {this.state.user}!
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
