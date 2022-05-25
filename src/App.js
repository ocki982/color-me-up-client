import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Background from "./components/Background";
import { Suspense } from "react";

function App() {
  return (
    <div className="app">
      <div className="canvas">
        <Suspense>
          <Background />
        </Suspense>
      </div>
      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
