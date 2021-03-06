"use strict";

import React from "react";
import Header from "./header.jsx";

export default class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 10,
            areActive: false,
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
        this.addTodo = this.addTodo.bind(this);
        this.showHeader = this.showHeader.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.searchForTodo = this.searchForTodo.bind(this);
        this.showActiveTodos = this.showActiveTodos.bind(this);
        this.changeTodoStatus = this.changeTodoStatus.bind(this);
        this.changeCategoryName= this.changeCategoryName.bind(this);
    }

    render() {

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {

                addTodo: this.addTodo,
                updateTodo: this.updateTodo,
                addCategory: this.addCategory,
                categories: this.state.categories,
                areActiveTodos: this.state.areActive,
                isTodoInfo: this.props.params.todoId,
                changeTodoStatus: this.changeTodoStatus,
                changeCategoryName: this.changeCategoryName,
            })
        );

        return (
            <div className="app-container">
                <Header name={this.showHeader()}
                        clearSearch={this.clearSearch}
                        searchForTodo={this.searchForTodo}
                        isTodoInfo={this.props.params.todoId}
                        showActiveTodos={this.showActiveTodos}/>
                {childrenWithProps}
            </div>
        );
    }

    showActiveTodos() {
        this.setState({areActive: !this.state.areActive});
    }

    searchForTodo(name) {
        this.props.router.push({query: {search: name}});
    }

    clearSearch() {
        this.props.router.push({query: {search: null}});
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
        const updatedCategories = [...this.state.categories];

        updatedCategories.forEach((cat) => {
            if (cat.id == categoryId) {
                cat.todos.unshift({
                    id: this.state.counter++, //todo create db
                    name: name,
                    isDone: false
                });
            }
        });

        this.setState({
            categories: updatedCategories,
            counter: this.state.counter++
        });
    }

    updateTodo(todo) {
        const updatedCategories = [...this.state.categories];

        updatedCategories.forEach((category) => {
            category.todos.map((task) => {
                if (task.id === todo.id) {
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
                if (task.id === todo.id) {
                    task.isDone = !task.isDone;
                }
            });
        });

        this.setState({
            categories: updatedCategories
        });
    }

    changeCategoryName(categoryId, name){
        const updatedCategories = [...this.state.categories];

        updatedCategories.forEach((cat) => {
            if (cat.id == categoryId) {
                cat.name = name;
            }
        });

        this.setState({
            categories: updatedCategories
        });
    }

    showHeader() {
        let changedHeader = "TodoList";
        if (this.props.params.todoId) {
            const updatedCategories = [...this.state.categories];

            updatedCategories.forEach((cat) => {
                if (cat.id == this.props.params.categoryId) {
                    cat.todos.forEach((todo) => {
                        if (todo.id == this.props.params.todoId) {
                            changedHeader = todo.name;
                        }
                    });
                }
            });
        }
        return changedHeader;
    }
}


