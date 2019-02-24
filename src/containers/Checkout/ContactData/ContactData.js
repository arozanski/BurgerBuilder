import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer : {
                name: 'Armand',
                address: '69 Shortmead Drive',
                postcode: 'En8 8TY',
            },
            deliveryMethod: 'collection'
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

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Your details</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Your email" />
                    <input type="text" name="street" placeholder="Street name" />
                    <input type="text" name="postcode" placeholder="Post code" />
                    <Button type="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;