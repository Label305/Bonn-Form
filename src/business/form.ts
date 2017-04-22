export interface FieldState {
    value: any;
    validationError?: string;
    pristine: boolean;
}

export class Form {

    private fieldStates: { [key: string]: FieldState } = {};
    private fieldListeners: { [fieldName: string]: Array<(value: any) => void> } = {};

    public getFieldState(fieldName: string): FieldState | undefined {
        return this.fieldStates[fieldName];
    }

    public setFieldValues(values: { [fieldName: string]: any }, pristineValues = false) {
        const fieldNames = Object.keys(values);
        fieldNames.forEach((fieldName) => {
            this.updateFieldValue(fieldName, values[fieldName], pristineValues);
        });

        this.triggerMultipleFieldListeners(fieldNames);
    }

    public setFieldValue(fieldName: string, value: any, pristineValue = false) {
        this.updateFieldValue(fieldName, value, pristineValue);

        this.triggerFieldListeners(fieldName);
    }

    private updateFieldValue(fieldName: string, value: any, pristineValue) {
        this.fieldStates[fieldName] = {
            ...this.fieldStates[fieldName],
            value,
            validationError: undefined,
            pristine: pristineValue
        };
    }

    public setValidationErrors(errors: { [fieldName: string]: string }) {
        const fieldNames = Object.keys(errors);

        fieldNames.forEach((fieldName) => {
            this.fieldStates[fieldName] = {
                ...this.fieldStates[fieldName],
                validationError: errors[fieldName]
            };
        });

        this.triggerMultipleFieldListeners(fieldNames);
    }

    public listenForFieldChange(fieldName: string, callback: (value: FieldState) => void) {
        if (typeof this.fieldListeners[fieldName] === 'undefined') {
            this.fieldListeners[fieldName] = [];
        }
        this.fieldListeners[fieldName].push(callback);
    }

    private triggerMultipleFieldListeners(fieldNames: string[]) {
        fieldNames.forEach((fieldName) => {
            this.triggerFieldListeners(fieldName);
        });
    }

    private triggerFieldListeners(fieldName: string) {
        if (typeof this.fieldListeners[fieldName] !== 'undefined') {
            this.fieldListeners[fieldName].forEach((callback) => callback(this.getFieldState(fieldName)));
        }
    }

}
