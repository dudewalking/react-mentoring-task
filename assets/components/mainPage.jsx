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
        this._toggleTodoStatus = this._toggleTodoStatus.bind(this);
    }

    componentWillMount() {
        let currentCategory = {};

        this.props.categories.forEach((cat) => {
            if (cat.id == this.props.params.id[0]) {
                currentCategory = cat;
            }
        });

        this.setState({category: currentCategory});
    }

    _toggleTodoStatus(todo) {
        this.props.toggleTodoStatus(todo);
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
                toggleTodoStatus: this._toggleTodoStatus
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