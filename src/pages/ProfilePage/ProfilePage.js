import "./ProfilePage.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const ProfilePage = () => {
  const [user, setUser] = useState("");
  const [post, setPost] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFailedAuth(true);
      return;
    }

    // Get the messages and user for the respective account
    axios
      .get("http://localhost:4000/posts/user/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch(() => {
        setFailedAuth(true);
      });
    axios
      .get("http://localhost:4000/users/current", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data.username);
      })
      .catch(() => {
        setFailedAuth(true);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser("");
    setFailedAuth(true);
    setPost(null);
  };

  const renderMessages = () => {
    return post.map(({ text, emotion }, index) => (
      <div key={index}>
        <h3
          className="profile__name"
          style={{ backgroundColor: emotion + `50`, color: emotion }}
        >
          <span className="profile__text">{text}</span>
        </h3>
      </div>
    ));
  };

  if (failedAuth) {
    return (
      <main className="profile">
        <p>
          Please log in to use this function. <Link to="/">Log in</Link>
        </p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="profile">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <div>
      <Header />
      <main className="profile">
        <h1 className="profile__title">Profile</h1>
        <h2 className="profile__dash"> {user}'s Messages</h2>
        {renderMessages()}
        <button className="profile__logout" onClick={handleLogout}>
          Log out
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;
