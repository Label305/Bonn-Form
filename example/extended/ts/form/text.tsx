import * as React from 'react';
import {Field, FieldProps} from '../../../../src/bonn';

interface OwnProps {

}

class Text extends React.Component<OwnProps & FieldProps, {}> {
    render() {
        return <div>
            <input
            type="text"
            value={this.props.value}
            name={this.props.name}
            onChange={(e: any) => this.props.onChange(e.target.value)}/>
            {this.props.validationError ? this.props.validationError : null}
        </div>
    }
}

export default Field<OwnProps>(Text);
