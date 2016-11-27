"use strict";

import React from "react";
import {ProgressBar} from "react-bootstrap";

import CategoriesTree from "./categoriesTree.jsx";
import SubtasksList from "./subtasksList.jsx";

export default class Body extends React.Component {

    render() {
        return (
            <div className="body-container">
                <Progress />
                <Categories categories={this.props.categories}/>
                <Subtasks todos={this.props.todos} />
            </div>
        );
    }
}


class Categories extends React.Component {
    render() {
        return (
            <div className="categories">
                <CategoriesTree categories={this.props.categories}/>
            </div>
        );
    }
}


class Subtasks extends React.Component {
    render() {
        return (
            <div className="subtasks">
                <SubtasksList todos={this.props.todos}/>
            </div>
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

