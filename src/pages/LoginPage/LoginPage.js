import "./LoginPage.scss";
import React, { useState } from "react";
import Input from "../../components/Input/Input";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
const FadeInDownAnimation = keyframes`${fadeIn}`;
const FadeInDownDiv = styled.div`
  animation: 3s ${FadeInDownAnimation};
`;

const LoginPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Function to submit user data to get back a JWT token
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://color-me-up.herokuapp.com/auth/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.user);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <FadeInDownDiv>
      <main className="login-page">
        <form className="login" onSubmit={handleSubmit}>
          <h1 className="login__title">Log in</h1>
          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <button className="login__button">Get your feelings</button>
          {error && <div className="login__message">{error}</div>}
          {success && <Redirect to="/home" />}
        </form>
        <p className="login__text">
          Need an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Or you can also enter as <Link to="/home">Guest!</Link>
        </p>
      </main>
    </FadeInDownDiv>
  );
};

export default LoginPage;
