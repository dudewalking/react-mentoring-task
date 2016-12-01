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
                    todos: [
                        {id: 1, name: "To-Do Item #1", isDone: true},
                        {id: 2, name: "To-Do Item #2", isDone: true}
                    ],
                    subCategories: [
                        {id: 1, name: "Category 1_1"},
                        {id: 2, name: "Category 1_2"},
                    ]
                },
                {
                    id: 2,
                    name: "Category 2",
                    todos: [
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
                    todos: [
                        {id: 5, name: "To-Do Item #5", isDone: false}
                    ],
                    subCategories: [
                        {id: 5, name: "Category 3_1"},
                        {id: 6, name: "Category 3_2"}
                    ]
                },
            ]
        };
        this.addCategory = this.addCategory.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                categories: this.state.categories,
                header: this.state.header,
                addCategory: this.addCategory.bind(this)
            })
        );

        return (
            <div className="app-container">
                {childrenWithProps}
            </div>
        );
    }

    addCategory(name) {
        const updatedCategories = [...this.state.categories];

        updatedCategories.unshift({
            id: this.state.categories.length + 1,
            name: name,
            todos: [],
            subCategories: []
        });

        this.setState({
            categories: updatedCategories
        });
    }

    addTodo() {

    }
}


