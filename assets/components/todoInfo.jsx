"use strict";

import React from "react";
import {Link} from "react-router";
import {Button, FormControl, FormGroup, Checkbox} from "react-bootstrap";


export default class TodoInfo extends React.Component {
    render() {
        const taskId = this.props.params.id[1];
        let todo = null;

        this.props.category.todos.map(task => {
            if (task.id == taskId) {
                todo = task;
            }
        });

        return (
            <div className="todo">
                <div className="todo-btns">
                    <SaveChanges />
                    <span> </span>
                    <Cancel />
                </div>
                <EditName name={todo.name}/>
                <Status status={todo.isDone}/>
                <Description />
            </div>
        );
    }
}

class SaveChanges extends React.Component {
    render() {
        return (
            <Button bsStyle="danger">Save changes</Button>
        );
    }
}

class Cancel extends React.Component {
    render() {
        return (
            <Link to="/">
                <Button>Cancel</Button>
            </Link>
        );
    }
}

class EditName extends React.Component {
    render() {
        return (
            <FormGroup className="todo-edit-name">
                <FormControl type="text" placeholder={this.props.name}/>
            </FormGroup>
        );
    }
}

class Status extends React.Component {
    render() {
        return (
            <Checkbox className="todo-status" checked={this.props.status} readOnly>Done</Checkbox>
        );
    }
}

class Description extends React.Component {
    render() {
        return (
            <FormGroup>
                <FormControl componentClass="textarea" placeholder="Description"/>
            </FormGroup>
        );
    }
}