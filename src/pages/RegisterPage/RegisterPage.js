import "./RegisterPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
const FadeInDownAnimation = keyframes`${fadeIn}`;
const FadeInDownDiv = styled.div`
  animation: 3s ${FadeInDownAnimation};
`;

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://color-me-up.herokuapp.com/auth/register", {
        email: event.target.email.value,
        password: event.target.password.value,
        username: event.target.username.value,
      })
      .then(() => {
        setSuccess(true);
        setError("");
        event.target.reset();
      })
      .catch((error) => {
        setSuccess(false);
        setError(error.response.data);
      });
  };

  return (
    <FadeInDownDiv>
      <main className="signup-page">
        <form className="signup" onSubmit={handleSubmit}>
          <h1 className="signup__title">Register</h1>
          <Input type="text" name="username" label="Username" />
          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <button className="signup__button">Sign up</button>
          {success && <div className="signup__message">Signed up!</div>}
          {error && <div className="signup__message">{error}</div>}
        </form>
        <p>
          Have an account? <Link to="/">Log in</Link>
        </p>
      </main>
    </FadeInDownDiv>
  );
};

export default RegisterPage;
