"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRedirect, IndexRoute, hashHistory} from "react-router";
import AppContainer from "./components/appContainer.jsx";
import MainPage from "./components/mainPage.jsx";
import Todos from "./components/todos.jsx";
import TodoInfo from "./components/todoInfo.jsx";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRedirect to="category/0"/>
            <Route path="category/:id" component={MainPage}>
                <IndexRoute component={Todos}/>
                <Route path="todo/:id" component={TodoInfo}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById("app"));