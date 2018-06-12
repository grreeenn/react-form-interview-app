// @flow
import React, {Component} from 'react';
import type {
    InputElementEventHandlers,
    TextInputElementData,
    TextInputRenderProps,
    TextInputState,
    TextInputType
} from './common/inputTypes';
import {InputLabel} from "./common/InputLabel";
import {InputError} from "./common/InputError";
import '../Form.css';

/*
 * Component which renders text input (including special HTML5 email and phone types)
 */
export class TextInput extends Component<TextInputRenderProps, { value: string }> {

    elementData: TextInputElementData;
    handlers: ?InputElementEventHandlers;
    providedState: TextInputState;

    constructor(props: TextInputRenderProps) {
        super(props);

        this.elementData = props.elementData;
        this.handlers = props.eventHandlers;
        this.providedState = props.state;
        this.state = {value: ""};

        //bind this to event handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    /*
     * fires onChange
     * if finds handler passed from parent, calls it
     * otherwise just updates the local state with new input value
     */
    handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (this.handlers && this.handlers.onChange) {
            this.handlers.onChange(value, this.elementData.elementName);
        } else {
            this.setState({value: event.target.value});
        }
    };

    /*
     * fires onBlur
     * calls handler passed from parent if any, otherwise moves on
     */
    handleBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (this.handlers && this.handlers.onBlur) {
            this.handlers.onBlur(value, this.elementData.elementName);
        }
    };

    // decide which element type to use - use HTML5 types for phone and email
    setElementType(): TextInputType {

        if (this.elementData.elementName === "email" || this.elementData.elementName === "tel") {
            return this.elementData.elementName;
        } else {
            return "text";
        }
    }

    render() {


        return (
            <div className="Form-row">
                <InputLabel
                    htmlFor={this.elementData.elementId}
                    labelText={this.elementData.labelText}
                    className="Input-label"
                />
                <input
                    type={this.setElementType()}
                    name={this.elementData.elementName}
                    id={this.elementData.elementId}
                    className="Form-input Text-input"
                    value={this.props.state.value || this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                {
                    //render error if there is one
                    this.props.state.status.errString ? <InputError errString={this.props.state.status.errString}/> : ""
                }
            </div>
        );
    }
}





