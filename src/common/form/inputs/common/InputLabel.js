// @flow
import React from 'react';
import type {LabelData} from "./inputTypes";

/*
 * Component which renders form input label
 */

export const InputLabel = (val: LabelData) => (
    <label className="Form-input-label" htmlFor={val.htmlFor}>
        {val.labelText}
    </label>
);

