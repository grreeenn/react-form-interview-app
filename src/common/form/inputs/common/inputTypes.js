// @flow
import React from 'react';
import type {ValidatorResponse} from "../../validators/validatorTypes";

/*
 * Types used for input fields
 */

//----------------------------------UNIVERSAL----------------------------------//

// set possible input types. Add more with | on new field types addition
export type InputComponentType = "TextInput"

/*
 * Abstract type for form input event handler functions
 * all of the fields must be optional so it may fit any input type
 */
export type InputElementEventHandlers = {
    onChange?: (value: string, fieldName: string) => void,
    onBlur?: (value: string, fieldName: string) => void,
}

//abstract type for form input element data
export type InputElementData = {
    elementName: string,
    labelText: string,
    elementId: string,
}

// input state object type
export type InputElementState = {
    status: ValidatorResponse,
    isDirty: boolean,
}

///// types for presentation functional components
// error label
export type ErrData = {
    errString: string,
}
// input label
export type LabelData = {
    htmlFor: string,
    labelText: string,
}
/////

//------------------------------------TEXT INPUTS------------------------------//

// type for element data
export type TextInputElementData = {
    ...$Exact<InputElementData>
}

// type for text field props object
export type TextInputRenderProps = {
    elementData: TextInputElementData,
    state: TextInputState,
    eventHandlers: InputElementEventHandlers,
};

// input state object
export type TextInputState = {
    ...$Exact<InputElementState>,
    value: string,
}

// type for text input content type - used for validation
export type TextInputContentType = "alphabetic" | "alphanumeric" | "numeric" | "email" | "any";

// field types - text or HTML5 specials
export type TextInputType = "email" | "tel" | "text";


//---------------------------------OTHER INPUTS (hypothetical)-----------------//