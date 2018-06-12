// @flow
import React, {Component} from 'react';
import * as formInputDataSetters from './formInputDataSetters';
import _ from 'lodash';
import {Mailer} from '../Mailer';
import {TextInput} from "./inputs/TextInput";
import type {FormData, FormInput, FormState, FormSubmitStatus} from './formTypes';
import type {
    InputComponentType,
    InputElementEventHandlers,
    TextInputElementData,
    TextInputState
} from "./inputs/common/inputTypes";
import type {ValidatorResponse} from "./validators/validatorTypes";
import './Form.css';

/*
 * Component which generates a form
 * Handles separate state and validation for each input
 *
 * Validation workflow:
 *  1. Field gets validated for the first time on onBlur event, and then marked as dirty
 *  2. Dirty field get validated on onChange event
 *  3. Submit actions validates untouched fields and alerts if they're mandatory
 *
 */
export class Form extends Component<FormData, FormState> {

    inputs: Array<FormInput>;
    validators: {};

    mailer: Mailer;

    constructor(props: FormData) {
        super(props);

        this.inputs = props.inputs;
        this.validators = this.getValidatorsByField();
        this.state = this.getInitialFormState();

        // bind this to event handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.mailer = new Mailer();
    }

    // generate initial component state
    getInitialFormState() {
        let state = {};
        let fieldName: string;
        for (let i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i].elementData && this.inputs[i].elementData.elementName) {
                fieldName = this.inputs[i].elementData.elementName;
            } else {//filter element creation issues
                throw new Error("Incorrect element data");
            }
            state[fieldName] = this.getInitialInputState(this.inputs[i].componentType);
        }

        state.status = {submitted: false};
        return state;
    }

    /*
     * gets initial input state by type
     * more types to be added on demand
     * initially each field is not valid, not dirty and has an empty value
     */
    getInitialInputState(type: string): TextInputState {
        switch (type) {
            default:
                return {
                    status: {valid: false},
                    isDirty: false,
                    value: "",
                };
        }
    }

    // arrange validators in object with field names as keys
    getValidatorsByField() {
        let fieldName: string;
        let validators = {};
        for (let i = 0; i < this.inputs.length; i++) {
            fieldName = this.inputs[i].elementData.elementName;
            validators[fieldName] = this.inputs[i].validator;
        }
        return validators;
    }


    /*
     * fires when a user moves the cursor out of an input
     * validates the input and marks field as dirty - so it will be validated onChange from this moment
     */
    handleBlur = (value: string, fieldName: string) => {
        const newInputState = _.merge({}, this.state[fieldName], {isDirty: true});
        this.setState({[fieldName]: newInputState}, () => {
            this.validateInput(value, fieldName);
        });

    };

    /*
     * fires on each change of a field value, updates the value in input's state
     * if field is already marked as dirty, triggers input validation
     */
    handleChange = (value: string, fieldName: string) => {
        const newInputState = _.merge({}, this.state[fieldName], {value: value});
        this.setState({[fieldName]: newInputState, status: {submitted: false}}, () => {
            if (this.state[fieldName].isDirty) {
                this.validateInput(value, fieldName);
            }
        });

    };

    /*
     * fires on form submit
     * tries to send mail with details
     * checks if the mail sending succeeded and sets status flag and text accordingly
     */
    handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
        //prevent default behavior and set temporary status (submitted:true to deactivate the button)
        event.preventDefault();
        //check if ready to submit (relay will also validate unvalidated fields if any)
        if (this.submissionRelay()) {

            //process status changes through typed variable to prevent submitStatusString enum errors
            let newStatus: FormSubmitStatus = {submitStatusString: "Sending...", submitted: true};
            this.setState({status: newStatus});

            newStatus = this.props.submitHandler();
            this.setState({status: newStatus});
        }
    };

    // validate inputs for fields that appear in validators object; otherwise assume it valid
    validateInput(value: string, fieldName: string) {
        let validity: ValidatorResponse;
        if (this.validators[fieldName]) { //if field has validation params set, validate it
            validity = this.validators[fieldName].validate(value);
        } else { //field should not be validated
            validity = {valid: true};
        }
        //merge the validity state to current field state object
        const newInputState = _.merge({}, this.state[fieldName], {status: validity});
        //update the field state object
        this.setState({[fieldName]: newInputState});
    }

    /*
     * fires on form submit
     * allows submit if all of the fields are valid and the form is not submitted yet
     * if some of the fields are not valid but yet to pass validation, validates them (and shows errors)
     */
    submissionRelay() {
        let validFlag = true;
        if (this.state.status.submitted) {
            validFlag = false;
        }
        let fieldName: string;
        for (let i = 0; i < this.inputs.length; i++) {
            fieldName = this.inputs[i].elementData.elementName;
            if (!this.state[fieldName].status.valid) {
                validFlag = false;
                if (!this.state[fieldName].isDirty)
                    this.validateInput(this.state[fieldName].value, fieldName);
            }
        }
        return validFlag;
    }

    // pack event handlers for child components
    setEventHandlers(): InputElementEventHandlers {
        return {
            onChange: this.handleChange,
            onBlur: this.handleBlur,
        };
    }

    render() {

        const inputList = {TextInput: TextInput};
        const eventHandlers: InputElementEventHandlers = this.setEventHandlers();
        let InputType: string;
        return (
            <div className="Form-container">
                <form id={this.props.htmlId} className="Form">

                    {this.inputs.map((input: FormInput) => {
                        if (inputList[input.componentType]) {
                            InputType = inputList[input.componentType];
                            return (

                                <InputType
                                    key={input.elementData.elementId}
                                    elementData={input.elementData}
                                    state={this.state[input.elementData.elementName]}
                                    eventHandlers={eventHandlers}
                                />
                            );
                        }
                        return false;
                    })}
                    <div className="Form-submit-controls">
                        <button className="Form-submit-button"
                                type="submit"
                                disabled={this.state.status.submitted}
                                onClick={this.handleSubmit}
                        >
                            Send
                        </button>
                        <span className="Form-submit-message">{this.state.status.submitStatusString}</span>
                    </div>
                </form>
            </div>
        );
    }

    static setElementData(inputType: InputComponentType,
                          id: string,
                          name: string,
                          labelText: string): TextInputElementData | false {
        switch (inputType) {
            case "TextInput":
                return formInputDataSetters.setTextInputData(id, name, labelText);
            default:
                return false;
        }
    }
}

