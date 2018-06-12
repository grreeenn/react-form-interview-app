import SyntheticInputEvent from 'react';
import {TextInputElementData} from "./inputs/common/inputTypes";
import {TextInputValidationParams} from "./validators/validatorTypes";

/*
 * Types used in form components
 */

//------------------------------------UNIVERSAL---------------------//

// type representing each input inside Form component
export type FormInput = {
    componentType: "TextInput", //add more values with | when adding new form components
    elementData: TextInputElementData, //add more values with | when adding new form components
    validator?: TextInputValidationParams, //add more values with | when adding new validators
}

// HTML ID for form element and an array of inputs which Form is composed of
export type FormData = {
    htmlId: string,
    inputs: [FormInput],
    submitHandler: (event: SyntheticInputEvent<HTMLInputElement>) => FormSubmitStatus,
}

// form submission status
export type FormSubmitStatus = {
    submitted: boolean,
    submitStatusString?: "Sending..." | "Sent" | "Sending failed, please try again",
}

// initial state type
export type FormState = {
    status: FormSubmitStatus
}



