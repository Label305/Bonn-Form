import * as React from 'react';
import {Form} from '../business/form';
export interface FormProps {
    form: Form;
}

interface OwnProps {
    values?: { [fieldName: string]: any };
}

type IncomingForm<Props> = new () => React.Component<Props & FormProps, any>;
type OutgoingForm<Props> = new () => React.Component<Props, any> ;

export function Bonn<Props>(WrappedComponent: IncomingForm<Props>): OutgoingForm<Props> {
    return class extends React.Component<Props & OwnProps, {}> {

        private form = new Form();

        public componentWillMount() {
            const values = this.props.values;
            if (typeof values !== 'undefined') {
                this.form.setFieldValues(values as  { [fieldName: string]: any });
            }
        }

        public componentWillUpdate(nextProps: Props & OwnProps) {
            if (typeof nextProps.values !== 'undefined' && typeof this.props.values !== 'undefined') {

                const updatedValues: { [fieldName: string]: any } = {};
                Object.keys(nextProps.values).forEach(fieldName => {
                    if (typeof nextProps.values !== 'undefined' && typeof this.props.values !== 'undefined') {
                        if (this.props.values[fieldName] !== nextProps.values[fieldName]) {
                            updatedValues[fieldName] = nextProps.values[fieldName];
                        }
                    }
                });
                this.form.setFieldValues(updatedValues);

            }
        }

        public render() {
            return <WrappedComponent {...this.props} form={this.form}/>;
        }
    };
}
