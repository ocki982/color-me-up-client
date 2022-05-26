import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { getEmotion } from "../../services/emotionServices";
import { unAuthAxiosCall } from "../../services";
import { arrayUnion } from "../../utils";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import allMessagesAtom from "../../recoil/atoms";
import { useRecoilState } from "recoil";
// Function to add animation on components
import { fadeIn } from "react-animations";
const FadeInDownAnimation = keyframes`${fadeIn}`;
const FadeInDownDiv = styled.div`
  animation: 3s ${FadeInDownAnimation};
`;

const HomePage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [allMessages, setAllMessages] = useRecoilState(allMessagesAtom);
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);


  // Connects to socket on back-end
  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);


  // Gets user info from token if user logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser("Guest");
      return;
    }
    axios
      .get("http://localhost:4000/users/current", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data.username);
      });
  }, []);


  // Listen to new messages posted to sync with the socket server
  useEffect(() => {
    const messageListener = (message) => {
      setAllMessages((prevMessages) => {
        let newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        newMessages = [...Object.values(newMessages)].map(
          ({ id, text, emotion, user }) => ({ id, text, emotion, user })
        );
        return arrayUnion(
          allMessages,
          newMessages,
          (arr1, arr2) => arr1.id === arr2.id
        );
      });
    };
    socket?.on("message", messageListener);
    socket?.emit("getMessages");

    return () => socket?.off("message", messageListener);
  }, [socket]);

  const handleChangeMessage = (e) => {
    setInputMessage(e.target.value);
  };


  // On submit the message will await for a function to recibe the data for that emotion
  const onMessageSubmit = async (e) => {
    e.preventDefault();
    const emotion = await getEmotion(inputMessage);
    socket?.emit("message", {
      text: inputMessage,
      emotion: emotion.data,
      user: user,
    });
    setInputMessage("");
  };


  // Scrolls down when new message is submited
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);


  // Render new messages when submitted
  const renderChat = () => {
    return allMessages.map((message, index) => (
      <FadeInDownDiv key={index}>
        <div className="home__box">
          <h3
            className="home__name"
            style={{
              backgroundColor: message.emotion + `50`,
              color: message.emotion,
            }}
          >
            {message.user}: <span className="home__text">{message.text}</span>
          </h3>
        </div>
      </FadeInDownDiv>
    ));
  };

  // Renders the rest of the page
  return (
    <div>
      <Header />
      <div className="home">
        <form className="home__form" onSubmit={onMessageSubmit}>
          <div>
            <input
              className="home__input"
              name="message"
              onChange={(e) => handleChangeMessage(e)}
              value={inputMessage}
              label="Message"
            />
          </div>
          <button className="home__button">Send Message</button>
        </form>
        <div className="home__content">
          <h1 className="home__title">Join the Emotion!</h1>
          <div className="home__chat">
            {renderChat()}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
