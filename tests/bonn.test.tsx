import * as React from 'react';
import {Bonn, Field, FieldProps, FormProps, Listener} from '../src/bonn';
import {Form} from '../src/business/form';
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

    it('should be able to pass bunch of initial fields at once during initialization', function () {
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
        const values = {
            'foo': 'bar',
            'blub': 'blab'
        };
        mount(<Component values={values}/>);

        /* Then */
        expect(passedForm.getFieldValue('foo')).toBe('bar');
        expect(passedForm.getFieldValue('blub')).toBe('blab');
    });

    it('should propagate changed initial values', function () {
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
        const values = {
            'foo': 'bar',
            'blub': 'blab'
        };
        const result = mount(<Component values={values}/>);
        result.setProps({
            values: {
                'foo': 'bar',
                'blub': 'blob'
            }
        });

        /* Then */
        expect(passedForm.getFieldValue('foo')).toBe('bar');
        expect(passedForm.getFieldValue('blub')).toBe('blob');
    });

    it('should handle newly added initial value', function () {
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
        const values = {
            'foo': 'bar',
            'blub': 'blab'
        };
        const result = mount(<Component values={values}/>);
        result.setProps({
            values: {
                'foo': 'bar',
                'blub': 'blab',
                'woo': 'waa',
            }
        });

        /* Then */
        expect(passedForm.getFieldValue('foo')).toBe('bar');
        expect(passedForm.getFieldValue('blub')).toBe('blab');
        expect(passedForm.getFieldValue('woo')).toBe('waa');
    });

    it('should only trigger changed listeners of changed fields while propagating updated initial value', function () {
        /* Given */
        let passedForm: Form | null = null;
        let numberOfTimesFooListenerTriggered = 0;
        let numberOfTimesBlubListenerTriggered = 0;
        class MyWrappedComponent extends React.Component<FormProps, {}> {
            componentWillMount() {
                this.props.form.listenForFieldChange('foo', () => {
                    numberOfTimesFooListenerTriggered++;
                });
                this.props.form.listenForFieldChange('blub', () => {
                    numberOfTimesBlubListenerTriggered++;
                });
            }

            render() {
                passedForm = this.props.form;
                return <div></div>
            }
        }

        /* When */
        const Component = Bonn<{}>(MyWrappedComponent);
        const values = {
            'foo': 'bar',
            'blub': 'blab'
        };
        const result = mount(<Component values={values}/>);
        result.setProps({
            values: {
                'foo': 'bar',
                'blub': 'blob'
            }
        });

        /* Then */
        expect(numberOfTimesFooListenerTriggered).toBe(0);
        expect(numberOfTimesBlubListenerTriggered).toBe(1);
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

        it('should use initial value', function () {
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
            mount(<Component form={form} value="Hello" name="field"/>);

            /* Then */
            expect(form.getFieldValue('field')).toBe('Hello');
        });

        it('should update value if value in props changes', function () {
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
            const result = mount(<Component form={form} value="Hello" name="field"/>);
            result.setProps({
                value: "Hi"
            });

            /* Then */
            expect(form.getFieldValue('field')).toBe('Hi');
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
        });

        it('should receive validation error', function () {
            /* Given */
            const form = new Form();

            class MyField extends React.Component<FieldProps, {}> {
                render() {
                    return <div>
                        <input name="field"/>
                        {this.props.validationError}
                    </div>
                }
            }
            const Component = Field<{}>(MyField);

            /* When */
            const result = mount(<Component name="field" form={form}/>);
            form.setValidationErrors({
                'field': 'Foutje'
            });

            /* Then */
            expect(result.text()).toContain('Foutje');
        });

        it('should clear validation error when value is updated', function () {
            /* Given */
            const form = new Form();

            class MyField extends React.Component<FieldProps, {}> {
                render() {
                    return <div>
                        <input name="field"/>
                        {this.props.validationError}
                    </div>
                }
            }
            const Component = Field<{}>(MyField);

            /* When */
            const result = mount(<Component name="field" form={form}/>);
            form.setValidationErrors({
                'field': 'Foutje'
            });
            form.setFieldValue('field', 'Howdy');

            /* Then */
            expect(result.text()).not.toContain('Foutje');
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