import * as React from 'react';
import {Field, FieldProps, FormProps} from '../../../../src/bonn';

interface OwnProps {

}

class OtherField extends React.Component<OwnProps & FieldProps & FormProps, {}> {
    render() {
        return <div>
            <input
                value={this.props.value}
                onChange={(e: any) => this.props.onChange(e.target.value)}/>
        </div>
    }
}

export default Field<OwnProps>('otherField', OtherField);
