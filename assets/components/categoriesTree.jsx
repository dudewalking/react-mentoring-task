"use strict";

import React from "react";
import {FormGroup, InputGroup, FormControl, Button, Glyphicon} from "react-bootstrap";

export default class CategoriesTree extends React.Component {
    render() {
        return (
            <div>
                <AddCategory />
                <CategoriesList categories={this.props.categories}/>
            </div>
        );
    }
}

class CategoriesList extends React.Component {
    render() {

        const categories = [...this.props.categories].map((category) => {
            console.log(category);
            return <Category name={category.name}
                             id={category.id}
                             key={category.id}
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

class AddCategory extends React.Component {
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
    render() {
        return (
            <li className="category-item">
                {this.props.subCategories.length > 0
                    ? <Glyphicon glyph="menu-down"/>
                    : null}

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