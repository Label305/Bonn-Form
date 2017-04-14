import * as React from 'react';
import {Form} from '../business/form';
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

