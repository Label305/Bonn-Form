import * as React from 'react';
import {FormProps} from './bonn';
import {Listener} from '../business/field_listener_repository';
export interface FieldProps {
    value: any;
    validationError: string | undefined;
    onChange: (value: any) => void;
}

interface OwnProps {
    name?: string;
    value?: string;
}

type IncomingField<Props> = new () => React.Component<Props & FieldProps, any>;
type OutgoingField<Props> = new () => React.Component<Props & FormProps, any> ;

export function Field<Props>(WrappedComponent: IncomingField<Props>,
                             fieldName: string | null = null): OutgoingField<Props & OwnProps> {

    return class extends React.Component<Props & OwnProps & FormProps, { value: any }> {

        public state: { value: any } = {
            value: this.props.form.getFieldValue(this.getFieldName())
        };

        private listener: Listener;

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

        public componentWillMount() {
            if (typeof this.props.value !== 'undefined') {
                this.props.form.setFieldValue(this.getFieldName(), this.props.value);
            }
        }

        public componentWillUnmount() {
            this.props.form.unsubscribe(this.listener);
        }

        public componentWillUpdate(nextProps: Props & OwnProps & FormProps) {
            if (typeof nextProps.value !== 'undefined' && this.props.value !== nextProps.value) {
                this.props.form.setFieldValue(this.getFieldName(), nextProps.value);
            }
        }

        public componentDidMount() {
            this.listener = this.props.form.subscribe(this.getFieldName(), (value: any) => {
                this.setState({
                    value: value
                });
            });
        }

        private handleChange(value: any) {
            this.props.form.setFieldValue(this.getFieldName(), value);
        }

        public render() {
            return <WrappedComponent
                {...this.props}
                value={this.state.value}
                validationError={this.props.form.getValidationError(this.getFieldName())}
                onChange={this.handleChange.bind(this)}
            />;
        }
    };
}
