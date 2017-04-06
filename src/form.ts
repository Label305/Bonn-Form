export class Form {

    private values: { [key: string]: any } = {};

    private fieldListeners: { [fieldName: string]: Array<(value: any) => void> } = {};

    public getFieldValue(fieldName: string): any {
        return this.values[fieldName];
    }

    public setFieldValue(fieldName: string, value: any) {
        this.values[fieldName] = value;

        if (typeof this.fieldListeners[fieldName] !== 'undefined') {
            this.fieldListeners[fieldName].forEach(callback => callback(value));
        }
    }

    public listenForFieldChange(fieldName: string, callback: (value: any) => void) {
        if (typeof this.fieldListeners[fieldName] === 'undefined') {
            this.fieldListeners[fieldName] = [];
        }
        this.fieldListeners[fieldName].push(callback);
    }
}