"use strict";

import React from "react";
import {ProgressBar, FormGroup, InputGroup, Button, FormControl} from "react-bootstrap";

export default class Body extends React.Component {
    render() {
        return (
            <div className="body-container">
                <Progress />
                <Categories />
                <Subtasks />
            </div>
        );
    }
}


class Categories extends React.Component {
    render() {
        return (
            <div className="categories">
                <CategoryButton />
                {/*<CategoriesTree />*/}
            </div>
        );
    }
}


class Subtasks extends React.Component {
    render() {
        return (
            <div className="subtasks">
                <SubtaskButton />
                {/*<SubtasksList />*/}
            </div>
        );
    }
}

class Progress extends React.Component {
    render() {
        return (
            <div className="todo-progress">
                <ProgressBar now={60}/>
            </div>
        );
    }
}


class CategoryButton extends React.Component {
    render() {
        return (
            <FormGroup className="category-input">
                <InputGroup>
                    <FormControl type="text" placeholder="Enter category title"/>
                    <InputGroup.Button>
                        <Button>Add</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

class SubtaskButton extends React.Component {
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