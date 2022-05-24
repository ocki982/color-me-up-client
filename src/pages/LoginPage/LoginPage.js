import "./LoginPage.scss";
import { Component } from "react";
import Input from '../../components/Input/Input';
import axios from "axios";
import { Redirect, Link } from 'react-router-dom';
import styled, { keyframes } from "styled-components";
import { fadeIn } from 'react-animations';
const FadeInDownAnimation = keyframes`${fadeIn}`;
const FadeInDownDiv = styled.div`
  animation: 3s ${FadeInDownAnimation};
`;


class LoginPage extends Component {
    state = {
        error: "",
        success: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:4000/auth/login', {
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then((response) => {
                localStorage.setItem("token", response.data.user);
                this.setState({ success: true });
            })
            .catch((error) => {
                this.setState({ error: error.response.data });
            });
    };

    render() {
        return (
            <FadeInDownDiv>
                <main className="login-page">
                    <form className="login" onSubmit={this.handleSubmit}>
                        <h1 className="login__title">Log in</h1>

                        <Input type="text" name="email" label="Email" />
                        <Input type="password" name="password" label="Password" />
                    
                        <button className="login__button">Log in</button>

                        {this.state.error && <div className="login__message">{this.state.error}</div>}
                        {this.state.success && <Redirect to="/home" />}
                    </form>
                    <p>
                        Need an account? <Link to="/register">Register</Link>
                    </p>
                </main>
            </FadeInDownDiv>
        );
    }
}

export default LoginPage;