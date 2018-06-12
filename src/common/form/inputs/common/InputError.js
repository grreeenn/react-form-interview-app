// @flow
import React from 'react';
import type {ErrData} from "./inputTypes";

/*
 * Component which renders form input error
 */

export const InputError = (val: ErrData) => (
    <span className="Input-error-container">
        {val.errString}
    </span>
);

