import * as React from 'react';
import {FormProps} from './bonn';
import {Listener} from '../business/field_listener_repository';

export interface ListenerState {
    values: any;
}

type IncomingListener<Props> = new () => React.Component<Props & FormProps, any>;
type OutgoingListener<Props> = new () => React.Component<Props, any> ;

export function Listener<Props>(WrappedComponent: IncomingListener<Props>, fieldNames: string[]): OutgoingListener<Props
    & FormProps> {
    return class extends React.Component<Props & FormProps, ListenerState> {

        public state: ListenerState = {
            values: this.getValues()
        };

        private listeners: Listener[] = [];

        public getValues(): any {
            const result: any = {};
            fieldNames.forEach(fieldName => {
                result[fieldName] = this.props.form.getFieldValue(fieldName);
            });

            return result;
        }

        public componentDidMount() {
            fieldNames.forEach(fieldName => {
                const listener = this.props.form.subscribe(fieldName, (value: any) => {
                    const values = {...this.state.values};
                    values[fieldName] = value;
                    this.setState({
                        values: values
                    });
                });
                this.listeners.push(listener);
            });
        }

        public componentWillUnmount() {
            this.listeners.forEach(listener => this.props.form.unsubscribe(listener));
        }

        public render() {
            return <WrappedComponent {...this.props} {...this.state.values}/>;
        }
    };
}
