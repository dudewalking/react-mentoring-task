"use strict";

import React from "react";
import {Checkbox, FormGroup, FormControl, Glyphicon} from "react-bootstrap";

export default class Header extends React.Component {
    render() {
        return (
            <div className="container-header">
                <span><h1>{this.props.name}</h1></span>

                {this.props.isShowActive
                    ? <Checkbox>Show active</Checkbox>
                    : null}

                {this.props.isSearch
                    ? <Search />
                    : null}

                {this.props.children}
            </div>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <FormGroup>
                <FormControl type="text" placeholder="Search"/>
                <FormControl.Feedback>
                    <Glyphicon glyph="remove"/>
                </FormControl.Feedback>
            </FormGroup>
        );
    }
}