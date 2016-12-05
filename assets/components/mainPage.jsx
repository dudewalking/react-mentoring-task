"use strict";

import React from "react";
import {ProgressBar} from "react-bootstrap";
import Body from "./body.jsx";
import {Categories, CategoriesList, CategoryAddButton} from "./categories.jsx";

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: {}
        };
        this._addCategory = this._addCategory.bind(this);
        this._showTodos = this._showTodos.bind(this);
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
        this._changeHeader = this._changeHeader.bind(this);
        this._updateTodo = this._updateTodo.bind(this);
    }

    componentWillMount() {
        let currentCategory = {};

        this.props.categories.forEach((category) => {
            if (category.id == this.props.params.id[0]) {
                currentCategory = category;
            }
        });

        this.setState({category: currentCategory});
    }

    _updateTodo(todo){
        this.props.updateTodo(todo);
    }

    _changeTodoStatus(todo) {
        this.props.changeTodoStatus(todo);
    }

    _changeHeader(title) {
        this.props.changeHeader(title);
    }

    _showTodos(category) {
        this.props.categories.filter(item => {
            if (item.id === category.id) {
                this.setState({category: category});
            }
        });
    }

    _addCategory(name) {
        this.props.addCategory(name);
    }

    _addTodo(name) {
        this.props.addTodo(this.state.category, name);
    }

    render() {
        const children = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                category: this.state.category,
                changeTodoStatus: this._changeTodoStatus,
                changeHeader: this._changeHeader,
                updateTodo: this._updateTodo
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
                                    isTodoList={this.props.isTodoList}
                                    showSubtasks={this._showTodos}/>
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