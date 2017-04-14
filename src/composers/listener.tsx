import * as React from 'react';
import {FormProps} from './bonn';

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

