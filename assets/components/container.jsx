"use strict";

import React from "react";
import {FormGroup, FormControl, Checkbox, Glyphicon} from "react-bootstrap";

import Body from "./body.jsx";

export default class Container extends React.Component {
    render() {
        return (
            <div className="app-container">
                <Header/>
                <Body />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="container-header">
                <span className="h3">To-Do List</span>
                <Checkbox>Show active</Checkbox>
                <Search />
            </div>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <FormGroup>
                <FormControl type="text" placeholder="Search"/>
                <FormControl.Feedback>
                    <Glyphicon glyph="remove"/>
                </FormControl.Feedback>
            </FormGroup>
        );
    }
}


