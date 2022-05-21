import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
	return(
	<div>
		<BrowserRouter>
			<Switch>
				<Route path="/home" component={HomePage}/>
				<Route path="/" component={LoginPage}/>
				<Route path="/register" component={RegisterPage}/>
				<Route path="/profile" component={ProfilePage}/>
			</Switch>
		</BrowserRouter>
	</div>
	);
}

export default App