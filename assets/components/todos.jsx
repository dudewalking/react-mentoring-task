"use strict";

import React from "react";
import {Link} from "react-router";
import {FormGroup, InputGroup, FormControl, Checkbox, Button, Glyphicon} from "react-bootstrap";


export default class Todos extends React.Component {

    constructor(){
        super();
        this._toggleTodoStatus = this._toggleTodoStatus.bind(this);
    }

    _toggleTodoStatus(todo){
        this.props.toggleTodoStatus(todo);
    }

    render() {
        let todos = [];

        if (this.props.category) {
            this.props.category.todos.forEach(todo => {
                todos.push(<Todo categoryId={this.props.category.id}
                                 todo={todo}
                                 key={todo.id}
                                 toggleTodoStatus={this._toggleTodoStatus}/>);
            });
        }

        return (
            <div className="todos">
                <AddTodo />
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
        this.props.addTodo(name);
    }

    render() {
        return (
            <FormGroup className="todos-input">
                <InputGroup>
                    <FormControl type="text" placeholder="Text input with button"/>
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
        this._toggleTodoStatus = this._toggleTodoStatus.bind(this);
    }

    _toggleTodoStatus() {
        this.props.toggleTodoStatus(this.props.todo);
    }

    render() {
        return (
            <li className="todos-item">
                <Checkbox checked={this.props.todo.isDone} onChange={this._toggleTodoStatus}>
                    <span className="todos-item-text">{this.props.todo.name}</span>
                </Checkbox>
                <Link to={`category/${this.props.categoryId}/todo/${this.props.todo.id}`}>
                    <Glyphicon glyph="edit" style={{cursor: "pointer"}}/>
                </Link>
            </li>
        );
    }
}