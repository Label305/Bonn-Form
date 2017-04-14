<p align="center"><h1>Bonn Form</h1></p>

<p align="center">
<img src="https://travis-ci.org/JBlaak/Bonn-Form.svg?branch=master" alt="Build Status">
</p>

Form handling for React with size in mind

**Work in progress!**

Bonn Form will distribute propagating of state changes to specific parts of your form, in other words: only update
those parts of your form that actually changed.

Usage
----

We're using composition to add functionality to our forms, you initialize Bonn-Form with the `Bonn` composer:
  
```javascript
import {Bonn} from '...to-be-determined'

class MyForm extends React.Component {
    render() {
        //... your form goes here
    }
}

export default Bonn(MyForm);
```

To able a field to work with Bonn-Form use the `Field` decorator
  
```javascript
import {Field} from '...to-be-determined'

class MyTextField extends React.Component {
    render() {
        return <div>
            <input 
                type="text" 
                name={this.props.name} 
                value={this.props.value} 
                onChange={e => this.props.onChange(e.target.value)}/>
            {this.props.validationErrors}
        </div>
    }
}

export default Field(MyTextField);
```

After which you can use it in your form:

```javascript
render() {
    return <div>
        <MyTextField name="foo" value="anything initial" form={this.props.form}/>
        <MyTextField name="bar" value="some other val" form={this.props.form}/>
    </div>
}
```



