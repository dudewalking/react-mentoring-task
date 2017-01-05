"use strict";

import React from "react";
import {Button, Glyphicon} from "react-bootstrap";

export default class TodoTools extends React.Component {

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