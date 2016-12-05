"use strict";

import React from "react";
import {browserHistory} from "react-router";
import {Button, FormControl, FormGroup, Checkbox} from "react-bootstrap";


export default class TodoInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTodo: {},
            todoStatus: false,
            todoName: "",
            todoDescription: ""
        };
        this._changeName = this._changeName.bind(this);
        this._changeDescription = this._changeDescription.bind(this);
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
        this._saveChanges = this._saveChanges.bind(this);
    }

    componentWillMount() {
        let currentTodo = {};

        this.props.category.todos.forEach((todo) => {
            if (todo.id == this.props.params.id[1]) {
                currentTodo = todo;
            }
        });

        this.setState({
            currentTodo: currentTodo,
            todoStatus: currentTodo.isDone,
            todoName: currentTodo.name,
            todoDescription: currentTodo.description
        });
    }

    _changeTodoStatus() {
        this.setState({todoStatus: !this.state.todoStatus});
    }

    _changeName(name) {
        this.setState({todoName: name});
    }

    _changeDescription(description) {
        this.setState({todoDescription: description});
    }

    _saveChanges() {
        let updatedTodo = this.state.currentTodo;

        updatedTodo.isDone = this.state.todoStatus;
        updatedTodo.name = this.state.todoName;
        updatedTodo.description = this.state.todoDescription;

        this.props.updateTodo(updatedTodo);
    }

    render() {

        return (
            <div className="todo">
                <div className="todo-btns">
                    <SaveChanges saveChanges={this._saveChanges}/>
                    <span> </span>
                    <Cancel />
                </div>

                <EditName name={this.state.currentTodo.name}
                          changeName={this._changeName}/>

                <Status status={this.state.todoStatus}
                        changeTodoStatus={this._changeTodoStatus}/>

                <Description description={this.state.currentTodo.description}
                             changeDescription={this._changeDescription}/>
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
                    onClick={() => {
                        this._saveChanges();
                        browserHistory.goBack();
                    }}>Save changes</Button>
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
                <FormControl type="text"
                             placeholder={this.props.name}
                             onFocus={(e) => e.target.value = this.props.name}
                             onChange={(e) => this.props.changeName(e.target.value)}/>
            </FormGroup>
        );
    }
}

class Status extends React.Component {

    constructor() {
        super();
        this._changeTodoStatus = this._changeTodoStatus.bind(this);
    }

    _changeTodoStatus() {
        this.props.changeTodoStatus();
    }

    render() {
        return (
            <Checkbox className="todo-status"
                      checked={this.props.status}
                      onChange={this._changeTodoStatus}>Done</Checkbox>
        );
    }
}

class Description extends React.Component {
    render() {
        return (
            <FormGroup>
                <FormControl componentClass="textarea"
                             placeholder={this.props.description || "Description"}
                             onFocus={(e) => e.target.value = this.props.description || ""}
                             onChange={(e) => this.props.changeDescription(e.target.value)}/>
            </FormGroup>
        );
    }
}