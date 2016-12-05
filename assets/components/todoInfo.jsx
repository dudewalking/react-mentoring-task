"use strict";

import React from "react";
import {browserHistory} from "react-router";
import {Button, FormControl, FormGroup, Checkbox} from "react-bootstrap";


export default class TodoInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTodo: {},
            todoStatus: false
        };
    }

    componentWillMount(){
        let currentTodo = {};

        this.props.category.todos.forEach((todo) => {
            if (todo.id == this.props.params.id[1]) {
                console.log(currentTodo);
                console.log(todo);
                currentTodo = todo;
            }
        });

        this.setState({
            currentTodo: currentTodo,
            todoStatus: currentTodo.isDone
        });
    }

    _toggleTodoStatus() {

        let updatedTodo = this.state.currentTodo;
        let updatedTodoStatus = !this.state.todoStatus;

        updatedTodo.isDone = updatedTodoStatus;

        this.setState({
            currentTodo: updatedTodo,
            todoStatus: updatedTodoStatus
        });
    }

    _saveChanges() {
        this.props.toggleTodoStatus(this.state.currentTodo);
    }

    render() {

        return (
            <div className="todo">
                <div className="todo-btns">
                    <SaveChanges saveChanges={this._saveChanges.bind(this)}/>
                    <span> </span>
                    <Cancel />
                </div>

                <EditName name={this.state.currentTodo.name}/>

                <Status status={this.state.todoStatus}
                        toggleTodoStatus={this._toggleTodoStatus.bind(this)}/>

                <Description />
            </div>
        );
    }
}

class SaveChanges extends React.Component {

    constructor() {
        super();
        this._saveChanges = this._saveChanges.bind(this);
    }

    _saveChanges() {
        this.props.saveChanges();
    }

    render() {
        return (
            <Button bsStyle="danger"
                    onClick={this._saveChanges && browserHistory.goBack}>Save changes</Button>
        );
    }
}

class Cancel extends React.Component {
    render() {
        return (
            <Button onClick={browserHistory.goBack}>Cancel</Button>
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

    constructor() {
        super();
        this._toggleTodoStatus = this._toggleTodoStatus.bind(this);
    }

    _toggleTodoStatus() {
        this.props.toggleTodoStatus();
    }

    render() {
        return (
            <Checkbox className="todo-status"
                      checked={this.props.status}
                      onChange={this._toggleTodoStatus}>Done</Checkbox>
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