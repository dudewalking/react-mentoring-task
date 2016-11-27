"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from "react-router";

import Container from "./components/container.jsx";
import Todo from "./components/specificTodo.jsx";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Container}/>
        <Route path="/todo/:id" component={Todo}/>
    </Router>,
    document.getElementById("app"));