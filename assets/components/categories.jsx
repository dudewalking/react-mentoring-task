"use strict";

import React from "react";
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
    }

    _showSubtasks(id) {
        this.setState({catId: id});
        this.props.showSubtasks(id);
    }

    render() {
        const categories = this.props.categories.map((category) => {
            return <Category name={category.name}
                             isSelected={category.id === this.state.categoryId}
                             id={category.id}
                             key={category.id}
                             isMain={this.props.isMain}
                             showSubtasks={this._showSubtasks.bind(this)}
                             subCategories={category.subCategories}/>;
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

    _showSubtasks() {
        this.props.showSubtasks(this.props.id);
    }

    render() {
        return (
            <li className={this.props.isSelected ? "category-item-selected" : "category-item"}>

                {this.props.subCategories.length > 0
                    ? <Glyphicon glyph="menu-down" className="category-expand-arrow"
                                 onClick={() => console.log("test")}/>
                    : null}

                <span className="category-text" onClick={this._showSubtasks.bind(this)}>
        {this.props.name}
        </span>

                {this.props.isMain
                    ? <MainCategoryTools />
                    : <TodoCategoryTools/>}
            </li>
        );
    }
}

class MainCategoryTools extends React.Component {
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

class TodoCategoryTools extends React.Component {
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