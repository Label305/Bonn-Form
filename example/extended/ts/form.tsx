import * as React from 'react';
import {Bonn, FormProps} from '../../../src/bonn';
import Text from './form/text';
import Name from './components/name';

interface OwnProps {

}

class Form extends React.Component<OwnProps & FormProps, {}> {

    private handleSubmit(e: any) {
        e.preventDefault();

        this.props.form.setValidationErrors({
            'first_name': 'Some wrong',
            'extra_field': 'Whoops',
        });
    }
    render() {
        return <form onSubmit={this.handleSubmit.bind(this)}>
            <Text form={this.props.form} name="first_name"/>
            <Text form={this.props.form} name="last_name"/>
            <Text form={this.props.form} name="extra_field"/>
            <Name form={this.props.form}/>
            <input type="submit" value="Submit"/>
        </form>
    }
}

export default Bonn<OwnProps>(Form);