import * as React from 'react';
import SomeField from './some_field';
import OtherField from './other_field';
import {Bonn, FormProps} from '../../../../src/bonn';

interface OwnProps {

}

class TheForm extends React.Component<OwnProps & FormProps, {}> {
    render() {
        const wholeBunchOfFields = [];
        for (let i = 0; i < 10000; i++) {
            wholeBunchOfFields.push(<OtherField key={i} form={this.props.form}/>);
        }

        return <form>
            My field (single super fast even when having thousands of fields in the form):
            <SomeField form={this.props.form}/>
            <br/>
            <br/>
            Whole bunch of fields in sync (so probably slow):
            {wholeBunchOfFields}
        </form>
    }
}

export default Bonn<OwnProps>(TheForm);