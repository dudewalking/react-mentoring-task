"use strict";

import React from "react";
import {Checkbox, FormGroup, FormControl, Glyphicon} from "react-bootstrap";

export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            areActive: false
        };
        this._showActiveTodos = this._showActiveTodos.bind(this);
        this._searchForTodo = this._searchForTodo.bind(this);
        this._clearSearch = this._clearSearch.bind(this);
    }

    _showActiveTodos() {
        this.setState({areActive: !this.state.areActive});
        this.props.showActiveTodos();
    }

    _searchForTodo(name) {
        this.props.searchForTodo(name.toLowerCase());
    }

    _clearSearch() {
        this.props.clearSearch();
    }

    render() {

        return (
            <div className="container-header">
                <span><h1>{this.props.name}</h1></span>

                {this.props.isTodoList
                    ? <Checkbox checked={this.state.areActive}
                                onChange={this._showActiveTodos}>Show active</Checkbox>
                    : null}

                {this.props.isTodoList
                    ? <Search searchForTodo={this._searchForTodo}
                              clearSearch={this._clearSearch}/>
                    : null}

                {this.props.children}
            </div>
        );
    }
}

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            searchValue: ""
        };
        this._searchForTodo = this._searchForTodo.bind(this);
        this._clearSearch = this._clearSearch.bind(this);
    }

    _searchForTodo(e) {
        this.setState({searchValue: e.target.value});
        this.props.searchForTodo(e.target.value);
    }

    _clearSearch() {
        this.setState({searchValue: ""});
        this.props.clearSearch();
    }

    render() {
        return (
            <FormGroup>
                <FormControl type="text"
                             placeholder="Search"
                             value={this.state.searchValue}
                             onChange={this._searchForTodo}/>
                <div className="container-header-search">
                    <FormControl.Feedback>
                        <Glyphicon glyph="remove"
                                   onClick={this._clearSearch}/>
                    </FormControl.Feedback>
                </div>
            </FormGroup>
        );
    }
}