"use strict";

import React from "react";
import Header from "./header.jsx";

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
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
        this.changeTodoStatus = this.changeTodoStatus.bind(this);
        this.changeHeader = this.changeHeader.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                header: this.state.header,
                categories: this.state.categories,
                isTodoList: this.props.routes[2].isTodoList,
                addTodo: this.addTodo,
                updateTodo: this.updateTodo,
                addCategory: this.addCategory,
                changeHeader: this.changeHeader,
                changeTodoStatus: this.changeTodoStatus,
            })
        );

        return (
            <div className="app-container">
                <Header name={this.state.header} isTodoList={ this.props.routes[2].isTodoList}/>
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

    addTodo(categoryId, name) {

    }

    changeHeader(title) {
        if( this.props.routes[2].isTodoList){
            this.setState({header: title});
        }
    }

    updateTodo(todo) {
        const updatedCategories = [...this.state.categories];

        updatedCategories.forEach((category) => {
            category.todos.map((task) => {
                if(task.id === todo.id){
                    return todo;
                }
            });
        });

        this.setState({
            categories: updatedCategories
        });
    }

    changeTodoStatus(todo) {
        const updatedCategories = [...this.state.categories];

        updatedCategories.forEach((category) => {
            category.todos.map((task) => {
                if(task.id === todo.id){
                    task.isDone = !task.isDone;
                }
            });
        });

        this.setState({
            categories: updatedCategories
        });
    }
}


