import {FieldListenerRepository, FieldListenerRepositoryImpl, Listener} from './field_listener_repository';
export class Form {
    private values: { [key: string]: any } = {};

    private validationErrors: { [fieldName: string]: any } = {};

    private _fieldListenerRepository: FieldListenerRepository;

    constructor(fieldListenerRepository: FieldListenerRepository | null = null) {
        this._fieldListenerRepository = fieldListenerRepository !== null
            ? fieldListenerRepository
            : new FieldListenerRepositoryImpl();
    }

    public getFieldValue(fieldName: string): any {
        return this.values[fieldName] || '';
    }

    public setFieldValues(values: { [fieldName: string]: any }) {
        const fieldNames = Object.keys(values);
        fieldNames.forEach((fieldName) => {
            this.values[fieldName] = values[fieldName];
            delete this.validationErrors[fieldName];
        });

        this.triggerMany(fieldNames);
    }

    public setFieldValue(fieldName: string, value: any) {
        this.values[fieldName] = value;
        delete this.validationErrors[fieldName];

        this._fieldListenerRepository.trigger(fieldName, value);
    }

    public setValidationErrors(errors: { [fieldName: string]: string }) {
        this.validationErrors = errors;

        const fieldNames = Object.keys(this.validationErrors);
        this.triggerMany(fieldNames);
    }

    public getValidationError(fieldName: string): string | undefined {
        return this.validationErrors[fieldName];
    }

    public subscribe(fieldName: string, callback: (value: any) => void): Listener {
        return this._fieldListenerRepository.subscribe(fieldName, callback);
    }

    public unsubscribe(listener: Listener) {
        this._fieldListenerRepository.unsubscribe(listener);
    }

    private triggerMany(fieldNames: string[]) {
        fieldNames.forEach(fieldName => this._fieldListenerRepository.trigger(fieldName, this.getFieldValue(fieldName)));
    }

}
