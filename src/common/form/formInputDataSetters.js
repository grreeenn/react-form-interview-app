// @flow

import type {TextInputElementData} from "./inputs/common/inputTypes";

export function setTextInputData(id: string, name: string, labelText: string): TextInputElementData {
    return {
        elementId: id,
        elementName: name,
        labelText: labelText,
    };
}