import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"

function App() {
	return(
	<div>
		<BrowserRouter>
			<Switch>
				<Route path="/home" component={HomePage}/>
			</Switch>
		</BrowserRouter>
	</div>
	);
}

export default App