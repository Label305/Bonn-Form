import * as React from 'react';
import {FormProps, Listener} from '../../../../src/bonn';

interface OwnProps {
}

interface ListenedProps {
    first_name: string;
    last_name: string;
}

class Name extends React.Component<OwnProps & FormProps & ListenedProps, {}> {
    render() {
        return <div>
            {this.props.first_name + ' ' + this.props.last_name}
        </div>
    }
}

export default Listener<OwnProps>(Name, ['first_name', 'last_name']);
