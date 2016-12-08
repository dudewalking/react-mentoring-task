"use strict";

import React from "react";
import {hashHistory} from "react-router";
import {Glyphicon} from "react-bootstrap";
import CategoryEditing from "../modals/categoryEditing.jsx";

export default class TodoListTools extends React.Component {

    constructor() {
        super();
        this.state = {
            isVisible: false
        };
        this._openEditModal = this._openEditModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._changeCategoryName = this._changeCategoryName.bind(this);
    }

    _changeCategoryName(name) {
        this.props.changeCategoryName(name);
    }

    _openEditModal() {
        hashHistory.push(`/category/${this.props.categoryId}`);
        this.setState({isVisible: true});
    }

    _closeModal() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <div className="category-tool">

                <Glyphicon glyph="edit"
                           style={{cursor: "pointer"}}
                           onClick={this._openEditModal}/>

                <div className="tools pull-right">
                    <Glyphicon glyph="trash"
                               style={{cursor: "pointer"}}
                               onClick={this._openDeleteModal}/>

                    <Glyphicon glyph="plus"
                               style={{cursor: "pointer"}}/>
                </div>

                <CategoryEditing isVisible={this.state.isVisible}
                                 closeModal={this._closeModal}
                                 changeCategoryName={this._changeCategoryName}/>

            </div>
        );
    }
}