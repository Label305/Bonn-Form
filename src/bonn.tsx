import * as React from 'react';
import {Form} from './form';

export interface FormProps {
    form: Form
}


type IncomingForm<Props> = new () => React.Component<Props & FormProps, any>;
type OutgoingForm<Props> = new () => React.Component<Props, any> ;


export function Bonn<Props>(WrappedComponent: IncomingForm<Props>): OutgoingForm<Props> {
    return class extends React.Component<Props, {}> {

        private form = new Form();

        public render() {
            return <WrappedComponent {...this.props} form={this.form}/>
        }
    }
}

export interface FieldProps {
    value: any;
    onChange: (value: any) => void;
}

interface OwnProps {
    name?: string;
}

type IncomingField<Props> = new () => React.Component<Props & FieldProps, any>;
type OutgoingField<Props> = new () => React.Component<Props & FormProps, any> ;

export function Field<Props>(WrappedComponent: IncomingField<Props>,
                             fieldName: string | null = null): OutgoingField<Props & OwnProps> {

    return class extends React.Component<Props & OwnProps & FormProps, { value: any }> {

        public state: { value: any } = {
            value: this.props.form.getFieldValue(this.getFieldName())
        };

        public getFieldName(): string {
            if (fieldName !== null) {
                return fieldName;
            }
            const nameFromProp = this.props.name;
            if (typeof nameFromProp === 'string') {
                return nameFromProp;
            }
            throw new Error('Could not resolve field name');
        }

        public componentDidMount() {
            this.props.form.listenForFieldChange(this.getFieldName(), (value: any) => {
                this.setState({
                    value: value
                });
            })
        }

        private handleChange(value: any) {
            this.props.form.setFieldValue(this.getFieldName(), value);
        }

        public render() {
            return <WrappedComponent
                {...this.props}
                value={this.props.form.getFieldValue(this.getFieldName())}
                onChange={this.handleChange.bind(this)}
            />
        }
    }
}


export interface ListenerProps {
}

export interface ListenerState {
    values: any
}

type IncomingListener<Props> = new () => React.Component<Props & FormProps, any>;
type OutgoingListener<Props> = new () => React.Component<Props, any> ;


export function Listener<Props>(WrappedComponent: IncomingListener<Props>, fieldNames: string[]): OutgoingListener<Props
    & FormProps> {
    return class extends React.Component<Props & FormProps, ListenerState> {

        public state: ListenerState = {
            values: this.getValues()
        };

        public getValues(): any {
            const result: any = {};
            fieldNames.forEach(fieldName => {
                result[fieldName] = this.props.form.getFieldValue(fieldName);
            });

            return result;
        }

        public componentDidMount() {
            fieldNames.forEach(fieldName => {
                this.props.form.listenForFieldChange(fieldName, (value: any) => {
                    this.setState({
                        values: this.getValues()
                    });
                })
            });
        }

        public render() {
            return <WrappedComponent {...this.props} {...this.state.values}/>
        }
    }
}

