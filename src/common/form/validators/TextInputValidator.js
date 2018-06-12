// @flow
import _ from 'lodash';
import type {TextInputLengthError, TextInputValidationParams, ValidatorResponse} from './validatorTypes';
import type {TextInputContentType} from "../inputs/common/inputTypes";


export class TextInputValidator {

    params: TextInputValidationParams;

    constructor(fieldName: string,
                contentType: TextInputContentType,
                minLength: ?number,
                maxLength: ?number) {

        this.params = {
            fieldName: fieldName,
            contentType: contentType,
            minLength: minLength,
            maxLength: maxLength,
        };
    }


    validate(input: string): ValidatorResponse {
        const params = this.params;

        //check empty mandatory field
        if (params.minLength && input.length === 0) {
            return {valid: false, errString: _.upperFirst(`${params.fieldName} is mandatory`)};
        }

        //check minimum length
        if (params.minLength && input.length < params.minLength) {
            return {valid: false, errString: this.getLengthErrorString("short")};
        }

        //check maximum length
        if (params.maxLength && input.length > params.maxLength) {
            return {valid: false, errString: this.getLengthErrorString("long")};
        }

        //check by content type
        if (!this.getRegexPattern().test(input)) {
            return {valid: false, errString: this.getRegexErrorString()}
        }

        //if passed
        return {valid: true, errString: ""};
    }

    // compose appropriate error message for input length errors
    getLengthErrorString(errType: TextInputLengthError): string {
        const params = this.params;
        let errString = _.upperFirst(`${params.fieldName} is too ${errType}, `);
        let shouldBe = `should `;
        let minLength = params.minLength;
        let maxLength = params.maxLength;

        if (minLength && maxLength && minLength !== maxLength) {
            shouldBe += `be between ${minLength} and ${maxLength}`;
        } else if (minLength && maxLength && minLength === maxLength) {
            shouldBe += `be ${minLength} `
        } else if (minLength && !maxLength) {
            shouldBe += `exceed ${minLength}`;
        } else if (!minLength && maxLength) {
            shouldBe += `be shorter than ${maxLength}`
        }
        shouldBe += params.contentType === "numeric" ? " digits" : " characters";

        return errString + shouldBe;
    }

    // compose appropriate error message for regex errors
    getRegexErrorString(): string {
        const params = this.params;
        let errString = `Incorrect ${params.fieldName} format`;
        switch (params.contentType) {
            case "alphabetic":
                return `${errString}. Only latin letters allowed`;
            case "email":
                return errString;
            case "numeric":
                return `${errString}. Only digits allowed`;
            case "alphanumeric":
                return `${errString}. Only latin letters and numbers allowed`;
            default:
                return errString;
        }
    }

    getRegexPattern(): RegExp {
        const type = this.params.contentType;
        switch (type) {
            case "alphabetic":
                return /^[a-zA-Z]*$/;
            case "email":
                // an HTML5 input field under-the-hood regex
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            case "numeric":
                return /^[0-9]*$/;
            case "alphanumeric":
                return /^[a-zA-Z0-9]*$/;
            default:
                // empty non-capturing group
                return /(?:)/;
        }
    }
}




