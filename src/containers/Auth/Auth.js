import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 5,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    checkRules (value, rules) {
        let valid = true;

        if (rules.required) {
            valid = value.trim() !== '' && valid;
        }

        if (rules.minLength) {
            valid = value.length >= rules.minLength && valid;
        }

        if (rules.maxLength) {
            valid = value.length <= rules.maxLength && valid;
        }

        if (rules.isEmail) {

        }

        return valid;
    }

    onChangeHandler = () => {

    }
    
    render () {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElements.map(element => {
            return <Input 
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        touched={element.config.touched}
                        shouldValidate={element.config.rules && element.config.rules.required}
                        change={(event) => this.onChangeHandler(event, element.id)} />
        });

        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                    <Button type="Success">Submit</Button>
                </form>
            </div>
        );
    };
}

export default Auth;