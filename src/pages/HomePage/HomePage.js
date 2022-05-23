import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Header from "../../components/Header/Header";
import "./HomePage.scss"



const HomePage = () => {
	const [ state, setState ] = useState({ message: "", name: "octa" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			// socketRef.current.on("output-messages", data => {
			// 	if (data.length) {
			// 		// console.log(data)
			// 		return data.map(data => (
			// 			setChat([ { message:data.comment, name:data.user }])
			// 		))
			// 	}
			// })
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3 className="home__name">
					{name}: <span className="home__text">{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div>		
			<Header/>
			<div className="home">					
				<form className="home__form" onSubmit={onMessageSubmit}>
					<div>
						<input
							className="home__input"
							name="message"
							onChange={(e) => onTextChange(e)}
							value={state.message}
							label="Message"
						/>
					</div>
					<button className="home__button">Send Message</button>
				</form>
				<div className="home__chat">
					<h1>Express yourself</h1>
					<div>
					{renderChat()}
					</div>
				</div>
			</div>
		</div>
	)
};

export default HomePage;