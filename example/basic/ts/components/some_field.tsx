import * as React from 'react';
import {Field, FieldProps, FormProps} from '../../../../src/bonn';

interface OwnProps {

}

class SomeField extends React.Component<OwnProps & FieldProps & FormProps, {}> {
    render() {
        return <input 
            value={this.props.value}
            onChange={(e: any) => this.props.onChange(e.target.value)}/>
    }
}

export default Field<OwnProps>('myField', SomeField);
