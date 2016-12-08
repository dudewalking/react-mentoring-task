"use strict";

import React from "react";
import {Link} from "react-router";
import {Glyphicon, FormGroup, InputGroup, Checkbox, Button} from "react-bootstrap";


export default class Todos extends React.Component {

    constructor() {
        super();
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
        this._addTodo = this._addTodo.bind(this);
    }

    _addTodo(name) {
        if (name) {
            this.props.addTodo(this.props.params.categoryId, name);
        }
    }

    _changeTodoStatus(todo) {
        this.props.changeTodoStatus(todo);
    }

    render() {
        let todos = [];

        if (this.props.params.categoryId) {
            this.props.categories.forEach(category => {

                if (category.id == this.props.params.categoryId) {

                    let actualTodos = category.todos;

                    if (this.props.areActiveTodos) {
                        actualTodos = category.todos.filter(todo => {
                            return !todo.isDone;
                        });
                    }

                    if (this.props.location.query.search && !this.props.areActiveTodos) {
                        actualTodos = category.todos.filter(todo => {
                            return todo.name.toLowerCase().includes(this.props.location.query.search);
                        });
                    }

                    if (this.props.location.query.search && this.props.areActiveTodos) {
                        actualTodos = category.todos.filter(todo => {
                            return !todo.isDone && todo.name.toLowerCase().includes(this.props.location.query.search);
                        });
                    }

                    actualTodos.forEach(todo => {
                        todos.push(<Todo categoryId={this.props.params.categoryId}
                                         todo={todo}
                                         key={todo.id}
                                         changeTodoStatus={this._changeTodoStatus}/>);
                    });
                }
            });
        }
        return (
            <div className="todos">
                <AddTodoButton addTodo={this._addTodo}/>
                <div className="todos-list">
                    <ul>
                        {todos}
                    </ul>
                </div>
            </div>
        );
    }
}


class AddTodoButton extends React.Component {

    constructor() {
        super();
        this._addTodo= this._addTodo.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _addTodo() {
        if (this.input.value) {
            this.props.addTodo(this.input.value);
            this.input.value = "";
        }
    }

    _handleKeyPress(e) {
        if (e.key === "Enter") {
            if (this.input.value) {
                this.props.addTodo(e.target.value);
                this.input.value = "";
            }
        }
    }
    render() {
        return (
            <FormGroup className="todos-input">
                <InputGroup>
                    <input type="text"
                           className="form-control"
                           placeholder="Text input with button"
                           ref={input => this.input = input}
                           onKeyPress={this._handleKeyPress}
                           maxLength="50"/>

                    <InputGroup.Button>
                        <Button bsStyle="danger"
                                onClick={this._addTodo}>Add</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

class Todo extends React.Component {

    constructor() {
        super();
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
    }

    _changeTodoStatus() {
        this.props.changeTodoStatus(this.props.todo);
    }

    render() {
        return (
            <li className="todos-item">
                <Checkbox checked={this.props.todo.isDone}
                          onChange={this._changeTodoStatus}>

                    <span className={this.props.todo.isDone
                        ? "todos-item-done"
                        : "todos-item-def"}>{this.props.todo.name}</span>

                </Checkbox>

                <Link to={`category/${this.props.categoryId}/todo/${this.props.todo.id}`}>

                    <Glyphicon glyph="edit" style={{cursor: "pointer"}}/>
                </Link>
            </li>
        );
    }
}