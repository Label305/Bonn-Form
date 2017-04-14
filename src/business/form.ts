export class Form {

    private values: { [key: string]: any } = {};

    private validationErrors: { [fieldName: string]: any } = {};

    private fieldListeners: { [fieldName: string]: Array<(value: any) => void> } = {};

    public getFieldValue(fieldName: string): any {
        return this.values[fieldName] || '';
    }

    public setFieldValues(values: { [fieldName: string]: any }) {
        const fieldNames = Object.keys(values);
        fieldNames.forEach((fieldName) => {
            this.values[fieldName] = values[fieldName];
            delete this.validationErrors[fieldName];
        });

        this.triggerMultipleFieldListeners(fieldNames);
    }

    public setFieldValue(fieldName: string, value: any) {
        this.values[fieldName] = value;
        delete this.validationErrors[fieldName];

        this.triggerFieldListeners(fieldName);
    }

    public setValidationErrors(errors: { [fieldName: string]: string }) {
        this.validationErrors = errors;

        const fieldNames = Object.keys(this.validationErrors);
        this.triggerMultipleFieldListeners(fieldNames);
    }

    public getValidationError(fieldName: string): string | undefined {
        return this.validationErrors[fieldName];
    }

    public listenForFieldChange(fieldName: string, callback: (value: any) => void) {
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
            this.fieldListeners[fieldName].forEach((callback) => callback(this.getFieldValue(fieldName)));
        }
    }

}
