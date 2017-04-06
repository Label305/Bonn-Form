import * as React from 'react';
import SomeField from './some_field';
import {Bonn, FormProps} from '../../../../src/bonn';

interface OwnProps {

}

class TheForm extends React.Component<OwnProps & FormProps, {}> {
    render() {
        return <form>
            <SomeField form={this.props.form}/>
            <SomeField form={this.props.form}/>
        </form>
    }
}

export default Bonn<OwnProps>(TheForm);