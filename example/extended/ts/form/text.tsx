import * as React from 'react';
import {Field, FieldProps} from '../../../../src/bonn';

class Text extends React.Component<FieldProps, {}> {
    render() {
        return <input
            type="text"
            value={this.props.value}
            onChange={(e: any) => this.props.onChange(e.target.value)}/>
    }
}

export default Field<{}>(Text);
