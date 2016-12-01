"use strict";

import React from "react";
import {Checkbox, FormGroup, Glyphicon, FormControl, ProgressBar} from "react-bootstrap";

import Header from "./header.jsx";
import Body from "./body.jsx";
import Todos from "./todos.jsx";
import {Categories, CategoriesList, CategoryAddButton} from "./categories.jsx";

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

    _addCategory(name) {
        this.props.addCategory(name);
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
                        <CategoryAddButton addCategory={this._addCategory.bind(this)}/>
                        <CategoriesList categories={this.props.categories}
                                        isMain={true}
                                        showSubtasks={this._showSubtasks.bind(this)}/>
                    </Categories>
                    <Todos categories={this.props.categories} categoryId={this.state.category}/>
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
                <ProgressBar bsStyle="success" now={60} label={`${60}%`}/>
            </div>
        );
    }
}