"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import AppContainer from "./components/appContainer.jsx";
import MainPage from "./components/mainPage.jsx";
import TodoPage from "./components/todoPage.jsx";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={MainPage}/>
            <Route path="/todo/:id" component={TodoPage}/>
        </Route>
    </Router>,
    document.getElementById("app"));