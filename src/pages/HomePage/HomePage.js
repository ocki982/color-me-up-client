import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { getEmotion } from "../../services/emotionServices";

const HomePage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    const messageListener = (message) => {
      setAllMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };
    socket?.on("message", messageListener);
    socket?.emit("getMessages");

    return () => socket?.off("message", messageListener);
  }, [socket]);

  const handleChangeMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    const emotion = await getEmotion(inputMessage);
    socket?.emit("message", { text: inputMessage, emotion: emotion.data });
    setInputMessage("");
  };

  const renderChat = () => {
    return [...Object.values(allMessages)].map((message, index) => (
      <div key={index} className="home__box">
        <h3 className="home__name">
          {message.user.name}:{" "}
          <span className="home__text">{message.text + message.emotion}</span>
        </h3>
      </div>
    ));
  };
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
        <div className="home__chat">
          <h1 className="home__title">Express yourself</h1>
          <div>{renderChat()}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
