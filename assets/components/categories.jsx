"use strict";

import React from "react";
import {Glyphicon, FormGroup, InputGroup, FormControl, Button} from "react-bootstrap";

export class Categories extends React.Component {

    _showSubtasks(id){
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

    _showSubtasks(id){
        this.props.showSubtasks(id);
    }

    render() {
        const categories = this.props.categories.map((category) => {
            return <Category name={category.name}
                             id={category.id}
                             key={category.id}
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

export class AddCategory extends React.Component {
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


class Category extends React.Component {

    _showSubtasks(){
        this.props.showSubtasks(this.props.id);
    }

    render() {
        return (
            <li className="category-item" onClick={this._showSubtasks.bind(this)}>
                {this.props.subCategories.length > 0 ? <Glyphicon glyph="menu-down"/> : null}
                <span className="category-text">{this.props.name}</span>
                <Glyphicon glyph="edit"/>
                <span className="pull-right category-tool">
                    <Glyphicon glyph="trash"/>
                    <span> </span>
                    <Glyphicon glyph="plus"/>
                </span>
            </li>
        );
    }
}