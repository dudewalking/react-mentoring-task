"use strict";

import React from "react";

export default class Body extends React.Component {
    render() {
        return (
            <div className="body-container">
                {this.props.children}
            </div>
        );
    }
}

