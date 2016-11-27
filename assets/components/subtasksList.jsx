"use strict";

import React from "react";
import {Link} from "react-router";
import {FormGroup, InputGroup, FormControl, Checkbox, Button, Glyphicon} from "react-bootstrap";


export default class SubtasksList extends React.Component {

    render() {
        const todos = [...this.props.todos].map((todo) => {
            return (
                <Todo todo={todo} key={todo.id}/>
            );
        });

        return (
            <div>
                <AddTodo />
                <div className="subtasks-list">
                    <ul>
                        {todos}
                    </ul>
                </div>
            </div>
        );
    }
}


class AddTodo extends React.Component {
    render() {
        return (
            <FormGroup className="subtask-input">
                <InputGroup>
                    <FormControl type="text" placeholder="Text input with button"/>
                    <InputGroup.Button>
                        <Button>Add</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

class Todo extends React.Component {

    render() {
        return (
            <li className="subtasks-item">
                <Checkbox>
                    <span className="subtask-text">{this.props.todo.name}</span>
                </Checkbox>
                <Link to={`/todo/${this.props.todo.id}`}>
                    <Glyphicon glyph="edit" style={{cursor: "pointer"}} />
                </Link>
            </li>
        );
    }
}