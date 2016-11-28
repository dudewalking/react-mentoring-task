"use strict";

import React from "react";

export default class Header extends React.Component {
    render() {
        return (
            <div className="container-header">
                {this.props.children}
            </div>
        );
    }
}