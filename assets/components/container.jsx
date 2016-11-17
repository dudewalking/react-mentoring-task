'use strict';

import React from 'react';
import {FormGroup, FormControl, Checkbox} from 'react-bootstrap';

export default class Container extends React.Component {
    render() {
        return (
            <div className="app-container">
                <Header/>
                <Body />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="container-header">
                <span className="h3">ToDo List</span>
                <Checkbox className="pull-right">Show active</Checkbox>
                <Search />
            </div>
        );
    }
}

class Body extends React.Component {
    render() {
        return (
            <div className="container-body">
                <p>Body</p>
            </div>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <FormGroup className="pull-right">
                <FormControl type="text" placeholder="Search"/>
            </FormGroup>
        );
    }
}