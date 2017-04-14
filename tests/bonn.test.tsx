import * as React from 'react';
import {Bonn, Field, FieldProps, FormProps, Listener} from '../src/bonn';
import {Form} from '../src/form';
import {mount} from 'enzyme';

describe('Bonn', function () {

    it('should pass a form instance to wrapped component', function () {
        /* Given */
        let passedForm: Form | null = null;
        class MyWrappedComponent extends React.Component<FormProps, {}> {
            render() {
                passedForm = this.props.form;
                return <div></div>
            }
        }

        /* When */
        const Component = Bonn<{}>(MyWrappedComponent);
        mount(<Component/>);

        /* Then */
        expect(passedForm).not.toBeNull();
    });

    describe('Field', function () {

        it('should pass changed value to form object', function () {
            /* Given */
            const form = new Form();

            class MyField extends React.Component<FieldProps, {}> {
                render() {
                    return <div>
                        <input name="field" onChange={(e: any) => this.props.onChange(e.target.value)}/>
                    </div>
                }
            }
            const Component = Field<{}>(MyField, 'field');

            /* When */
            const result = mount(<Component form={form}/>);
            result.find('input[name="field"]').simulate('change', {
                target: {
                    value: 'Hello'
                }
            });

            /* Then */
            expect(form.getFieldValue('field')).toBe('Hello');
        });

        it('should pass use given name from props', function () {
            /* Given */
            const form = new Form();

            class MyField extends React.Component<FieldProps, {}> {
                render() {
                    return <div>
                        <input name="field" onChange={(e: any) => this.props.onChange(e.target.value)}/>
                    </div>
                }
            }
            const Component = Field<{}>(MyField);

            /* When */
            const result = mount(<Component name="field" form={form}/>);
            result.find('input[name="field"]').simulate('change', {
                target: {
                    value: 'Hello'
                }
            });

            /* Then */
            expect(form.getFieldValue('field')).toBe('Hello');
        })

    });

    describe('Listener', function () {

        it('should receive updates about subscribed fields', function () {
            /* Given */
            const form = new Form();

            interface OwnProps {
                field: string
            }

            let lastFieldValue: null | string = null;

            class MyComponent extends React.Component<FormProps & OwnProps, {}> {
                render() {
                    lastFieldValue = this.props.field;
                    return <div></div>
                }
            }

            /* When */
            const Component = Listener<{}>(MyComponent, ['field']);
            const result = mount(<Component form={form}/>);
            form.setFieldValue('field', 'blub');

            /* Then */
            expect(lastFieldValue).toBe('blub');
        });

        it('should not trigger updates when not component is not listening to certain field', function () {
            /* Given */
            const form = new Form();

            interface OwnProps {
                field: string
            }

            let numRendersForComponent = 0;

            class MyComponent extends React.Component<FormProps & OwnProps, {}> {
                render() {
                    numRendersForComponent++;
                    return <div></div>
                }
            }

            /* When */
            const Component = Listener<{}>(MyComponent, ['field']);
            mount(<Component form={form}/>);
            form.setFieldValue('otherfield', 'blub');
            form.setFieldValue('otherfield', 'blub');
            form.setFieldValue('field', 'blub');
            form.setFieldValue('otherfield', 'blub');

            /* Then */
            expect(numRendersForComponent).toBe(2);
        });

    });

});