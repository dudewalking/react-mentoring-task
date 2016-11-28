"use strict";

import React from "react";
import {Link} from "react-router";
import {FormGroup, InputGroup, FormControl, Checkbox, Button, Glyphicon} from "react-bootstrap";


export default class Tasks extends React.Component {
    render() {
        const id = this.props.categoryId;
        let todos = [];

        if (id !== 0) {
            this.props.categories[id - 1].tasks.map(todo => {
                todos.push(<Todo todo={todo} key={todo.id}/>);
            });
        }

        return (
            <div className="tasks">
                <AddTodo />
                <div className="tasks-list">
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
            <FormGroup className="task-input">
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
            <li className="tasks-item">
                <Checkbox>
                    <span className="task-text">{this.props.todo.name}</span>
                </Checkbox>
                <Link to={`/todo/${this.props.todo.id}`}>
                    <Glyphicon glyph="edit" style={{cursor: "pointer"}}/>
                </Link>
            </li>
        );
    }
}