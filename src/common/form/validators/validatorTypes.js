// @flow
import React from 'react';
import type { TextInputContentType } from "../inputs/common/inputTypes";

/*
 * Types used in input validators
 */

//-----------------------------------UNIVERSAL--------------------------//

// response object type
export type ValidatorResponse = {
    valid: boolean,
    errString?: string,
}

//----------------------------------TEXT INPUTS------------------------//

// type for validator params object
export type TextInputValidationParams = {
    fieldName: string,
    contentType: TextInputContentType,
    minLength?: ?number,
    maxLength?: ?number,
    mandatory?: ?boolean,
}

export type TextInputLengthError = "long" | "short"