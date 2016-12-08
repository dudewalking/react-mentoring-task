"use strict";

import React from "react";
import {Link} from "react-router";
import {Glyphicon, FormGroup, InputGroup, Button} from "react-bootstrap";

export class Categories extends React.Component {

    render() {
        return (
            <div className="categories">
                {this.props.children}
            </div>
        );
    }
}

export class CategoriesList extends React.Component {

    _changeCategoryName(name) {
        console.log(name);
    }

    render() {
        const categories = this.props.categories.map(category => {
            return <Category key={category.id}
                             isTodoInfo={this.props.isTodoInfo}
                             category={category}
                             changeCategoryName={this._changeCategoryName}/>;
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

    constructor() {
        super();
        this._addCategory = this._addCategory.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _addCategory() {
        if (this.input.value) {
            this.props.addCategory(this.input.value);
            this.input.value = "";
        }
    }

    _handleKeyPress(e) {
        if (e.key === "Enter") {
            if (this.input.value) {
                this.props.addCategory(e.target.value);
                this.input.value = "";
            }
        }
    }

    render() {
        return (
            <FormGroup className="category-input">
                <InputGroup>
                    <input className="form-control"
                           type="text"
                           placeholder="Enter category title"
                           ref={input => this.input = input}
                           onKeyPress={this._handleKeyPress}
                           maxLength="30"/>

                    <InputGroup.Button>
                        <Button bsStyle="danger"
                                onClick={this._addCategory}>Add</Button>
                    </InputGroup.Button>

                </InputGroup>
            </FormGroup>
        );
    }
}


class Category extends React.Component {

    constructor() {
        super();
        this._changeCategoryName = this._changeCategoryName.bind(this);
    }

    _changeCategoryName() {
        this.props.changeCategoryName(this.props.category.name);
    }

    render() {
        return (
            <li className="category-item">
                {this.props.category.subCategories.length > 0
                    ? <Glyphicon glyph="menu-down"
                                 className="category-expand-arrow"/>
                    : null}

                <div className="category-text">
                    <Link to={`category/${this.props.category.id}`}
                          activeClassName="category-item-selected">{this.props.category.name}
                    </Link>
                </div>

                {this.props.isTodoInfo
                    ? <TodoTools/>
                    : <TodoListTools changeCategoryName={this._changeCategoryName}/>}
            </li>
        );
    }
}

class TodoListTools extends React.Component {

    constructor() {
        super();
        this._changeCategoryName = this._changeCategoryName.bind(this);
    }

    _changeCategoryName() {
        this.props.changeCategoryName();
    }

    render() {
        return (
            <div className="category-tool">
                <Glyphicon glyph="edit"
                           style={{cursor: "pointer"}}
                           onClick={this._changeCategoryName}/>

                <div className="tools pull-right">
                    <Glyphicon glyph="trash"
                               style={{cursor: "pointer"}}/>
                    <Glyphicon glyph="plus"
                               style={{cursor: "pointer"}}/>
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