import * as React from 'react';
import {Form} from './form';

export interface FormProps {
    form: Form
}

export function Bonn<Props>(WrappedComponent: new () => React.Component<Props
    & FormProps, any>): new () => React.Component<Props, any> {
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

export function Field<Props>(fieldName: string,
                             WrappedComponent: new () => React.Component<Props
                                 & FieldProps, any>): new () => React.Component<Props & FormProps, any> {
    return class extends React.Component<Props & FormProps, { value: any }> {

        public state: { value: any } = {
            value: this.props.form.getFieldValue(fieldName)
        };

        public componentDidMount() {
            this.props.form.listenForFieldChange(fieldName, (value: any) => {
                this.setState({
                    value: value
                });
            })
        }

        private handleChange(value: any) {
            this.props.form.setFieldValue(fieldName, value);
        }

        public render() {
            return <WrappedComponent
                {...this.props}
                value={this.props.form.getFieldValue(fieldName)}
                onChange={this.handleChange.bind(this)}
            />
        }
    }
}
