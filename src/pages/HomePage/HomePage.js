import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { getEmotion } from "../../services/emotionServices";
import { unAuthAxiosCall } from "../../services";
import { arrayUnion } from "../../utils"

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
    unAuthAxiosCall("/posts/all", {
      method: "GET"
    }).then((response) =>{
      const newAllMessages = arrayUnion(allMessages, response.data, (arr1, arr2) => arr1.id === arr2.id)
      setAllMessages(newAllMessages)
    });
  }, [])
  
  useEffect(() => {
    const messageListener = (message) => {
      setAllMessages((prevMessages) => {
        let newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        newMessages = [...Object.values(newMessages)].map(({id, text, emotion, user}) => ({id, text, emotion, user}))
        return arrayUnion(allMessages, newMessages, (arr1, arr2) => arr1.id === arr2.id)
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
    return allMessages.map((message, index) => (
      <div key={index} className="home__box">
        <h3 className="home__name" style={{backgroundColor: message.emotion + `50`, color: message.emotion}}>
          {message.user.name}:{" "}
          <span className="home__text" >{message.text}</span>
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
        <div className="home__content">
          <h1 className="home__title">Express yourself</h1>
          <div className="home__chat">{renderChat()}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
