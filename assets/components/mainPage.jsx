"use strict";

import React from "react";
import {ProgressBar} from "react-bootstrap";
import Body from "./body.jsx";
import {Categories} from "./categories.jsx";

export default class MainPage extends React.Component {

    constructor() {
        super();
        this._addTodo = this._addTodo.bind(this);
        this._updateTodo = this._updateTodo.bind(this);
        this._addCategory = this._addCategory.bind(this);
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
        this._changeCategoryName = this._changeCategoryName.bind(this);
    }

    _updateTodo(todo) {
        this.props.updateTodo(todo);
    }

    _changeTodoStatus(todo) {
        this.props.changeTodoStatus(todo);
    }

    _changeCategoryName(categoryId, name) {
        this.props.changeCategoryName(categoryId, name);
    }

    _addCategory(name) {
        this.props.addCategory(name);
    }

    _addTodo(categoryId, name) {
        this.props.addTodo(categoryId, name);
    }

    render() {

        const children = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                addTodo: this._addTodo,
                updateTodo: this._updateTodo,
                categories: this.props.categories,
                changeTodoStatus: this._changeTodoStatus,
                areActiveTodos: this.props.areActiveTodos,
            })
        );

        return (
            <div className="main-page">
                <Progress isTodoInfo={this.props.isTodoInfo}/>
                <Body>
                <Categories categories={this.props.categories}
                            addCategory={this._addCategory}
                            isTodoInfo={this.props.isTodoInfo}
                            changeCategoryName={this._changeCategoryName}/>

                {children}

                </Body>
            </div>
        );
    }
}

class Progress extends React.Component {
    render() {
        return (
            !this.props.isTodoInfo ?
                <div className="todo-progress">
                    <ProgressBar bsStyle="success" now={60} label={`${60}%`}/>
                </div>
                : null
        );
    }
}