"use strict";

import React from "react";

export default class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            header: "To-Do List",
            categories: [
                {
                    id: 1,
                    name: "Category 1",
                    tasks: [
                        {id: 1, name: "To-Do Item #1", isDone: true},
                        {id: 2, name: "To-Do Item #2", isDone: true}
                    ],
                    subCategories: [
                        {id: 1, name: "Category 1_1"},
                        {id: 2, name: "Category 1_2"}
                    ]
                },
                {
                    id: 2,
                    name: "Category 2",
                    tasks: [
                        {id: 3, name: "To-Do Item #3", isDone: false},
                        {id: 4, name: "To-Do Item #4", isDone: false}
                    ],
                    subCategories: [
                        {id: 3, name: "Category 2_1"},
                        {id: 4, name: "Category 2_2"}
                    ]
                },
                {
                    id: 3,
                    name: "Category 3",
                    tasks: [
                        {id: 5, name: "To-Do Item #5", isDone: false}
                    ],
                    subCategories: [
                        {id: 5, name: "Category 3_1"},
                        {id: 6, name: "Category 3_2"}
                    ]
                },
            ]
        };
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                categories: this.state.categories,
                header: this.state.header
            })
        );

        return (
            <div className="app-container">
                {childrenWithProps}
            </div>
        );
    }
}


