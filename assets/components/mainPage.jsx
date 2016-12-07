"use strict";

import React from "react";
import {ProgressBar} from "react-bootstrap";
import Body from "./body.jsx";
import {Categories, CategoriesList, CategoryAddButton} from "./categories.jsx";

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryId: props.params.id[0]
        };
        this._addCategory = this._addCategory.bind(this);
        this._addTodo = this._addTodo.bind(this);
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
        this._updateTodo = this._updateTodo.bind(this);
    }

    _updateTodo(todo) {
        this.props.updateTodo(todo);
    }

    _changeTodoStatus(todo) {
        this.props.changeTodoStatus(todo);
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
                categories: this.props.categories,
                categoryId: this.props.params.id[0],
                todoId: this.props.params.id[1],
                areActiveTodos: this.props.areActiveTodos,
                changeTodoStatus: this._changeTodoStatus,
                updateTodo: this._updateTodo,
                addTodo: this._addTodo,
            })
        );

        return (
            <div className="main-page">
                <Progress isVisible={this.props.isTodoList}/>
                <Body>
                <Categories>

                    {this.props.isTodoList
                        ? <CategoryAddButton addCategory={this._addCategory}/>
                        : null}

                    <CategoriesList categories={this.props.categories}
                                    isTodoList={this.props.isTodoList}/>
                </Categories>

                {children}

                </Body>
            </div>
        );
    }
}

class Progress extends React.Component {
    render() {
        return (
            this.props.isVisible ?
                <div className="todo-progress">
                    <ProgressBar bsStyle="success" now={60} label={`${60}%`}/>
                </div>
                : null
        );
    }
}