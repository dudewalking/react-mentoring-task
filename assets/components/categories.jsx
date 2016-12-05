"use strict";

import React from "react";
import {Link} from "react-router";
import {Glyphicon, FormGroup, InputGroup, Button} from "react-bootstrap";

export class Categories extends React.Component {

    _showSubtasks(id) {
        this.props.showSubtasks(id);
    }

    render() {
        return (
            <div className="categories">
                {this.props.children}
            </div>
        );
    }
}

export class CategoriesList extends React.Component {

    constructor() {
        super();
        this.state = {
            categoryId: 0
        };
        this._showSubtasks = this._showSubtasks.bind(this);
    }

    _showSubtasks(category) {
        this.setState({categoryId: category.id});
        this.props.showSubtasks(category);
    }

    render() {
        const categories = this.props.categories.map((category) => {
            return <Category isSelected={category.id === this.state.categoryId}
                             key={category.id}
                             isTodoList={this.props.isTodoList}
                             showSubtasks={this._showSubtasks}
                             category={category}/>;
        });

        return (
            <div className="categories-tree">
                <ul>
                    {categories}
                </ul>
            </div>
        );
    }
}

export class CategoryAddButton extends React.Component {

    _addCategory(name) {
        this.props.addCategory(name);
    }

    render() {
        return (
            <FormGroup className="category-input" >
                <InputGroup>
                    <input className="form-control"
                           type="text"
                           placeholder="Enter category title"
                           ref={input => this.input = input}/>
                    <InputGroup.Button>
                        <Button bsStyle="danger" onClick={() => {
                            if (this.input.value) {
                                this._addCategory(this.input.value);
                                this.input.value = "";
                            }
                        }}>Add</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}


class Category extends React.Component {

    constructor() {
        super();
        this._showSubtasks = this._showSubtasks.bind(this);
    }

    _showSubtasks() {
        this.props.showSubtasks(this.props.category);
    }

    render() {
        return (
            <li className="category-item">
                {this.props.category.subCategories.length > 0
                    ? <Glyphicon glyph="menu-down" className="category-expand-arrow"/>
                    : null}

                <div className="category-text" onClick={this._showSubtasks}>
                    <Link to={`category/${this.props.category.id}`} activeClassName="category-item-selected">
                        {this.props.category.name}
                    </Link>
                </div>

                {this.props.isTodoList
                    ? <TodoListTools />
                    : <TodoTools/>}
            </li>
        );
    }
}

class TodoListTools extends React.Component {
    render() {
        return (
            <div className="category-tool">
                <Glyphicon glyph="edit"/>
                <div className="pull-right">
                    <Glyphicon glyph="trash"/>
                    <span>  </span>
                    <Glyphicon glyph="plus"/>
                </div>
            </div>
        );
    }
}

class TodoTools extends React.Component {
    render() {
        return (
            <div className="category-tool">
                <Button className="pull-right">
                    <Glyphicon glyph="backward"/>
                </Button>
            </div>
        );
    }
}