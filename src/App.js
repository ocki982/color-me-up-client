import "./App.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
	return(
	<div className="app">
		<BrowserRouter>
			<Switch>
				<Route path="/home" component={HomePage}/>
				<Route path="/" exact component={LoginPage}/>
				<Route path="/register" component={RegisterPage}/>
				<Route path="/profile" component={ProfilePage}/>
			</Switch>
		</BrowserRouter>
	</div>
	);
}

export default App