"use strict";

import React from "react";
import {Link} from "react-router";
import {Button, FormControl, FormGroup, Checkbox} from "react-bootstrap";


export default class Task extends React.Component {
    render() {
        return (
            <div className="task">
                <div className="task-btns">
                    <SaveChanges />
                    <span> </span>
                    <Cancel />
                </div>
                <EditName name={this.props.todo.name}/>
                <Status status={this.props.todo.isDone}/>
                <Description />
            </div>
        );
    }
}

class SaveChanges extends React.Component {
    render() {
        return (
            <Button bsStyle="primary">Save changes</Button>
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
            <FormGroup className="edit-task-name">
                <FormControl type="text" placeholder={this.props.name}/>
            </FormGroup>
        );
    }
}

class Status extends React.Component {
    render() {
        return (
            <Checkbox className="task-status" checked={this.props.status} readOnly>Done</Checkbox>
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