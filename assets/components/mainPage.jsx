"use strict";

import React from "react";
import {ProgressBar} from "react-bootstrap";
import Body from "./body.jsx";
import {Categories, CategoriesList, CategoryAddButton} from "./categories.jsx";

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: props.categories[props.params.id[0]],
        };
        this._addCategory = this._addCategory.bind(this);
        this._showSubtasks = this._showSubtasks.bind(this);
    }

    _showSubtasks(category) {
        this.props.categories.filter(item => {
            if (item.id === category.id) {
                this.setState({category: category});
            }
        });
    }

    _addCategory(name) {
        this.props.addCategory(name);
    }

    _addTodo(name) {
        this.props.addTodo(this.state.category, name);
    }

    render() {

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                category: this.state.category,
            })
        );

        return (
            <div className="main-page">
                <Progress isVisible={this.props.isProgressVisible}/>
                <Body>
                <Categories>

                    {this.props.isTodoList
                        ? <CategoryAddButton addCategory={this._addCategory}/>
                        : null}

                    <CategoriesList categories={this.props.categories}
                                    isTodoList={this.props.isTodoList}
                                    showSubtasks={this._showSubtasks}/>
                </Categories>

                {childrenWithProps}

                </Body>
            </div>
        );
    }
}

class Progress extends React.Component {
    render() {
        return (
            this.props.isVisible ?
                <div className="todo-progress">
                    <ProgressBar bsStyle="success" now={60} label={`${60}%`}/>
                </div>
                : null
        );
    }
}