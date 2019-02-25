import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your address'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postcode'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                rules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'free', displayValue: 'Free'}, {value: 'priority', displayValue:'Priority'}]
                },
                value: 'free',
                rules: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
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

        return valid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then(response => {
                setTimeout(() => {
                    this.setState({loading: false});
                    this.props.history.push('/');
                }, 0);
            })
            .catch(error => this.setState({loading: false}));
    }

    onChangeHandler = (event, elementId) => {
        const formData = {...this.state.orderForm};
        const elementData = {...formData[elementId]};

        elementData.value = event.target.value;
        elementData.valid = this.checkRules(elementData.value, elementData.rules);
        elementData.touched = true;
        formData[elementId] = elementData;

        let formIsValid = true;

        for (let input in formData) {
            formIsValid = formData[input].valid && formIsValid;
        }

        this.setState({orderForm: formData, formIsValid}); 
    }

    render () {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        return (
            <div className={classes.ContactData}>
                <h4>Your details</h4>
                <form onSubmit={this.orderHandler}>
                    {formElements.map(element => (
                        <Input key={element.id} 
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                            shouldValidate={element.config.rules && element.config.rules.required}
                            change={(event) => this.onChangeHandler(event, element.id)} />
                    ))}
                    <Button type="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;