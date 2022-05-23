import "./App.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Render from "./components/Render/Render";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from 'react'


function App() {
	return(
	<div className="app">
		<div className="canvas">
			<Canvas>
				<OrbitControls enableZoom={false}/>
				<ambientLight intensity={0.5}/>
				<directionalLight position={[-2, 5, 2]} intensity={1}/>
				<Suspense fallback={null}>
					<group position={[0, 0, 0]}>
						<Render/>
					</group>
				</Suspense>
			</Canvas>
		</div>
		<div className="page">
			<BrowserRouter>
				<Switch>
					<Route path="/home" component={HomePage}/>
					<Route path="/" exact component={LoginPage}/>
					<Route path="/register" component={RegisterPage}/>
					<Route path="/profile" component={ProfilePage}/>
				</Switch>
			</BrowserRouter>
		</div>
	</div>
	);
}

export default App