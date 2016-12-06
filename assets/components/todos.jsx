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
        this.props.addTodo(this.props.categoryId, name);
    }

    _changeTodoStatus(todo) {
        this.props.changeTodoStatus(todo);
    }

    render() {
        let todos = [];

        if (this.props.categoryId) {
            this.props.categories.forEach(category => {
                if (category.id == this.props.categoryId) {
                    category.todos.forEach(todo => {
                        todos.push(<Todo categoryId={this.props.categoryId}
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

    _addTodo(name) {
        this.props.addTodo(name);
    }

    render() {
        return (
            <FormGroup className="todos-input">
                <InputGroup>
                    <input type="text"
                           className="form-control"
                           placeholder="Text input with button"
                           ref={input => this.input = input}
                           maxLength="50"/>
                    <InputGroup.Button>
                        <Button bsStyle="danger" onClick={() => {
                            if (this.input.value) {
                                this._addTodo(this.input.value);
                                this.input.value = "";
                            }
                        }}>Add</Button>
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