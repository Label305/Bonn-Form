import * as React from 'react';
import {Bonn, FormProps} from '../../../src/bonn';
import Text from './form/text';
import Name from './components/name';

interface OwnProps {

}

class Form extends React.Component<OwnProps & FormProps, {}> {
    render() {
        return <form>
            <Text form={this.props.form} name="first_name"/>
            <Text form={this.props.form} name="last_name"/>
            <Text form={this.props.form} name="extra_field"/>
            <Name form={this.props.form}/>
        </form>
    }
}

export default Bonn<OwnProps>(Form);