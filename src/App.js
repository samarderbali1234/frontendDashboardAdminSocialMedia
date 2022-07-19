import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import React, { Component } from 'react';
import Login from "./components/auth/Login";

import NotFound from "./components/layout/NotFound";
import { Provider } from "react-redux";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/auth/Register";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutAdmin} from "./actions/authActions";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/popper.js/dist/popper';
import User from "./components/pages/Users";
import Event from "./components/pages/Events";
import Post from "./components/pages/Posts";
import Storie from "./components/pages/Stories";
import notif from "./components/pages/notif";
import Discussion from "./components/pages/Discussions";
import ChatBody from "./components/pages/chat/ChatBody";
import icondata from "./components/pages/icondata";
import ChangePassword from "./components/pages/ChangePassword";
import categorie from "./components/pages/Categories";
if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutAdmin());
        window.location.href = "./login";
    }
}

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route  path="/register" component={Register} />
                            <Route  path="/login" component={Login} />
                            <Switch>
                                <PrivateRoute  path="/dashboard" component={Dashboard} />
                                <PrivateRoute  path="/users" component={User} />
                                <PrivateRoute  path="/events" component={Event} />
                                <PrivateRoute  path="/posts" component={Post} />
                                <PrivateRoute  path="/stories" component={Storie} />
                                <PrivateRoute  path="/discussions" component={Discussion} />
                                <PrivateRoute  path="/notif" component={notif} />
                                <PrivateRoute  path="/Categories" component={categorie} />
                                <PrivateRoute  path="/chatbody" component={ChatBody} />
                                <PrivateRoute  path="/data" component={icondata} />
                               
                                <PrivateRoute  path="/changepassword" component={ChangePassword} />
                               
                                 </Switch>
                            <Route exact path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
