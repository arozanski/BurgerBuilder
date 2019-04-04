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

    checkValidity = (value, rules) => {
        let isValid = true;
        
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, name) => {
        const udpatedControls = {
            ...this.state.controls,
            [name]: {
                ...this.state.controls[name],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[name].rules),
                touched: true
            }
        }

        this.setState({controls: udpatedControls});
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