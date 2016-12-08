"use strict";

import React from "react";
import {Link} from "react-router";
import {Glyphicon, FormGroup, InputGroup, Button} from "react-bootstrap";
import TodoListTools from "./tools/todoListTools.jsx";
import TodoTools from "./tools/todoTools.jsx";

export class Categories extends React.Component {

    constructor() {
        super();
        this._addCategory = this._addCategory.bind(this);
        this._changeCategoryName = this._changeCategoryName.bind(this);
    }

    _addCategory(name) {
        this.props.addCategory(name);
    }

    _changeCategoryName(categoryId, name) {
        this.props.changeCategoryName(categoryId, name);
    }

    render() {

        const categories = this.props.categories.map(category => {
            return <Category key={category.id}
                             isTodoInfo={this.props.isTodoInfo}
                             category={category}
                             changeCategoryName={this._changeCategoryName}/>;
        });

        return (
            <div className="categories">
                {!this.props.isTodoInfo
                    ? <CategoryAddButton addCategory={this._addCategory}/>
                    : null}

                <div className="categories-tree">
                    <ul>
                        {categories}
                    </ul>
                </div>

            </div>
        );
    }
}


class CategoryAddButton extends React.Component {

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

    _changeCategoryName(name) {
        this.props.changeCategoryName(this.props.category.id, name);
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
              : <TodoListTools changeCategoryName={this._changeCategoryName}
                                     categoryId={this.props.category.id}/>}
            </li>
        );
    }
}