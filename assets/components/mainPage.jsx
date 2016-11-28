"use strict";

import React from "react";
import {Checkbox, FormGroup, Glyphicon, FormControl, ProgressBar} from "react-bootstrap";

import AppContainer from "./appContainer.jsx";
import Header from "./header.jsx";
import Body from "./body.jsx";
import Tasks from "./tasks.jsx";
import {Categories, CategoriesList, AddCategory} from "./categories.jsx";

export default class MainPage extends React.Component {

    constructor() {
        super();
        this.state = {
            category: 0
        };
    }

    _showSubtasks(id) {
        this.setState({category: id});
    }

    render() {
        return (
            <div className="main-page">
                <Header>
                    <span><h1>{this.props.header}</h1></span>
                    <Checkbox>Show active</Checkbox>
                    <Search />
                </Header>
                <Progress />
                <Body>
                    <Categories>
                        <AddCategory />
                        <CategoriesList categories={this.props.categories} showSubtasks={this._showSubtasks.bind(this)}/>
                    </Categories>
                    <Tasks categories={this.props.categories} categoryId={this.state.category}/>
                </Body>
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

class Progress extends React.Component {
    render() {
        return (
            <div className="todo-progress">
                <ProgressBar now={60}/>
            </div>
        );
    }
}