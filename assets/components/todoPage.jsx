"use strict";

import React from "react";
import Header from "./header.jsx";
import Body from "./body.jsx";
import TodoInfo from "./todoInfo.jsx";
import {Categories, CategoriesList} from "./categories.jsx";

export default class TodoPage extends React.Component {
    render() {

        const taskId = this.props.params.id;
        let todo = null;

        this.props.categories.forEach(category => {
            category.todos.map(task => {
                if (task.id == taskId) {
                    todo = task;
                }
            });
        });

        return (
            <div className="todo-page">
                <Header>
                    <span><h1>{todo.name}</h1></span>
                </Header>
                <Body>
                    <Categories>
                        <CategoriesList isMain={false} categories={this.props.categories}/>
                    </Categories>
                    <TodoInfo todo={todo}/>
                </Body>
            </div>
        );
    }
}
