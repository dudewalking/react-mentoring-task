"use strict";

import React from "react";
import {Link} from "react-router";
import {FormGroup, InputGroup, Checkbox, Button, Glyphicon} from "react-bootstrap";


export default class Todos extends React.Component {

    constructor() {
        super();
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
        this._changeHeader = this._changeHeader.bind(this);
        this._addTodo = this._addTodo.bind(this);
    }

    _addTodo(name) {
        this.props.addTodo(name);
    }

    _changeTodoStatus(todo) {
        this.props.changeTodoStatus(todo);
    }

    _changeHeader(title) {
        this.props.changeHeader(title);
    }

    render() {
        let todos = [];

        if (this.props.category) {
            this.props.category.todos.forEach(todo => {
                todos.push(<Todo categoryId={this.props.category.id}
                                 todo={todo}
                                 key={todo.id}
                                 changeTodoStatus={this._changeTodoStatus}
                                 changeHeader={this._changeHeader}/>);
            });
        }

        return (
            <div className="todos">
                <AddTodo addTodo={this._addTodo}/>
                <div className="todos-list">
                    <ul>
                        {todos}
                    </ul>
                </div>
            </div>
        );
    }
}


class AddTodo extends React.Component {

    _addTodo(name) {
        console.log(this.props);
        this.props.addTodo(name);
    }

    render() {
        return (
            <FormGroup className="todos-input">
                <InputGroup>
                    <input type="text"
                           className="form-control"
                           placeholder="Text input with button"
                           ref={input => this.input = input}/>
                    <InputGroup.Button>
                        <Button bsStyle="danger" onClick={() => {
                            if (this.input.value) {
                                this._addTodo(this.input.value);
                                this.input.value = "";
                            }
                        }}
                        >Add</Button>
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
        this._changeHeader = this._changeHeader.bind(this);
    }

    _changeTodoStatus() {
        this.props.changeTodoStatus(this.props.todo);
    }

    _changeHeader() {
        this.props.changeHeader(this.props.todo.name);
    }

    render() {
        return (
            <li className="todos-item">
                <Checkbox checked={this.props.todo.isDone}
                          onChange={this._changeTodoStatus}>

                    <span className="todos-item-text">{this.props.todo.name}</span>
                </Checkbox>

                <Link to={`category/${this.props.categoryId}/todo/${this.props.todo.id}`}
                      onClick={this._changeHeader}>

                    <Glyphicon glyph="edit" style={{cursor: "pointer"}}/>
                </Link>
            </li>
        );
    }
}