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
    render() {
        const categories = this.props.categories.map(category => {
            return <Category key={category.id}
                             isTodoInfo={this.props.isTodoInfo}
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
            <FormGroup className="category-input">
                <InputGroup>
                    <input className="form-control"
                           type="text"
                           placeholder="Enter category title"
                           ref={input => this.input = input}
                           maxLength="30"/>

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
                    : <TodoListTools />}
            </li>
        );
    }
}

class TodoListTools extends React.Component {

    render() {
        return (
            <div className="category-tool">
                <Glyphicon glyph="edit" style={{cursor: "pointer"}}/>
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