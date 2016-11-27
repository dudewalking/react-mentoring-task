"use strict";

import React from "react";
import {FormGroup, FormControl, Checkbox, Glyphicon} from "react-bootstrap";
import Body from "./body.jsx";

export default class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {id: 1, name: "To-Do Item #1", isDone: false},
                {id: 2, name: "To-Do Item #1", isDone: false},
                {id: 3, name: "To-Do Item #1", isDone: false},
                {id: 4, name: "To-Do Item #1", isDone: false},
                {id: 5, name: "To-Do Item #1", isDone: false}
            ],
            categories: [
                {id: 1, name: "Category 1", subCategories: []},
                {id: 2, name: "Category 2", subCategories: []},
                {
                    id: 3, name: "Category 3", subCategories: [{id: 4, name: "Category 3_1", subCategories: []},
                    {id: 5, name: "Category 3_2", subCategories: []},
                    {id: 6, name: "Category 3_3", subCategories: []}]
                },
            ]
        };
    }

    render() {
        return (
            <div className="app-container">
                <Header/>
                <Body todos={this.state.todos} categories={this.state.categories}/>
            </div>
        );
    }
}

export class Header extends React.Component {
    render() {
        return (
            <div className="container-header">
                <span className="h2">To-Do List</span>
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


