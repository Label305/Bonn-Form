export class Form {

    private values: { [key: string]: any } = {};

    private validationErrors: { [fieldName: string]: any } = {};

    private fieldListeners: { [fieldName: string]: Array<(value: any) => void> } = {};

    public getFieldValue(fieldName: string): any {
        return this.values[fieldName] || '';
    }

    public setFieldValue(fieldName: string, value: any) {
        this.values[fieldName] = value;
        delete this.validationErrors[fieldName];

        if (typeof this.fieldListeners[fieldName] !== 'undefined') {
            this.fieldListeners[fieldName].forEach(callback => callback(value));
        }
    }

    public setValidationErrors(errors: { [fieldName: string]: string }) {
        this.validationErrors = errors;
        for (const fieldName in this.validationErrors) {
            this.fieldListeners[fieldName].forEach(callback => callback(this.getFieldValue(fieldName)));
        }
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
}