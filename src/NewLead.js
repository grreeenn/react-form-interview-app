// @flow
import React, {Component} from 'react';
import {Form} from "./common/form/Form";
import type {FormInput, FormData, FormSubmitStatus} from "./common/form/formTypes";
import {TextInputValidator} from "./common/form/validators/TextInputValidator";
import {Mailer} from "./common/Mailer";


export class NewLead extends Component<{}> {

    inputs:FormData;
    mailer: Mailer;

    constructor() {
        super();

        this.inputs = this.composeInputsArray();
        this.mailer = new Mailer();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // set up inputs that we want to appear in this form
    composeInputsArray(): FormData {
        let inputs = [];

        const firstName: FormInput = {
            componentType: "TextInput",
            elementData: Form.setElementData("TextInput", "newLeadFirstNameInput", "firstName", "First name"),
            validator: new TextInputValidator("first name", "alphabetic", 2),
        };
        const lastName: FormInput = {
            componentType: "TextInput",
            elementData: Form.setElementData("TextInput", "newLeadLastNameInput", "lastName", "Last name"),
            validator: new TextInputValidator("last name", "alphabetic", 2),
        };
        const email: FormInput = {
            componentType: "TextInput",
            elementData: Form.setElementData("TextInput", "newLeadEmailInput", "email", "Email"),
            validator: new TextInputValidator("email", "email", 1),
        };
        const tel: FormInput = {
            componentType: "TextInput",
            elementData: Form.setElementData("TextInput", "newLeadTelInput", "tel", "Phone"),
            validator: new TextInputValidator("phone", "numeric", 10, 10),
        };

        inputs.push(firstName, lastName, email, tel);
        return inputs;
    }

    // submit logic may vary in different forms, so put it here

    handleSubmit = (): FormSubmitStatus => {
        //try to send an email from newLead form, get status to variable
        const mailSent: boolean = this.mailer.trySendFormMail("#newLead", "new_lead");
        let newStatus: FormSubmitStatus;
        //set the form status according to the mail sending status
        if (mailSent) {
            newStatus = {submitted: mailSent, submitStatusString: "Sent"};
        } else {
            newStatus = {submitted: mailSent, submitStatusString: "Sending failed, please try again"};
        }
        return newStatus;
    };



    render() {
        return(
            <Form
                htmlId="newLead"
                inputs={this.inputs}
                submitHandler={this.handleSubmit}
            />
        );
    }




}