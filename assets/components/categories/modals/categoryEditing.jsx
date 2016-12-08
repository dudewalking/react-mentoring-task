"use strict";

import React from "react";
import {Modal, FormGroup, InputGroup, Button} from "react-bootstrap";

export default class CategoryEditing extends React.Component {

    constructor() {
        super();
        this._close = this._close.bind(this);
        this._changeCategoryName = this._changeCategoryName.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _changeCategoryName() {
        if (this.input.value) {
            this.props.changeCategoryName(this.input.value);
            this._close();
        }
    }

    _close() {
        this.props.closeModal();
    }

    _handleKeyPress(e) {
        if (e.key === "Enter") {
            if (this.input.value) {
                this.props.changeCategoryName(e.target.value);
                this._close();
            }
        }
    }

    render() {
        return (
            <Modal show={this.props.isVisible} onHide={this._close}>
                <Modal.Header closeButton>
                    <Modal.Title>Category Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup className="category-input">
                        <InputGroup>
                            <input className="form-control"
                                   type="text"
                                   placeholder="Enter new category title"
                                   ref={input => this.input = input}
                                   onKeyPress={this._handleKeyPress}
                                   maxLength="30"/>

                            <InputGroup.Button>
                                <Button bsStyle="danger"
                                        onClick={this._changeCategoryName}>Change</Button>
                            </InputGroup.Button>

                        </InputGroup>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}