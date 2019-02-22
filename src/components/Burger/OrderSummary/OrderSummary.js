import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientSummary = this.props.ingredients ? Object.keys(this.props.ingredients)
            .map(ingredient => {
                return this.props.ingredients[ingredient] > 0 ? <li key={ingredient}><span style={{textTransform: "capitalize"}}>
                        {ingredient}</span>: {this.props.ingredients[ingredient]}</li> : null;
            }) : null;

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Total price: <strong>£{this.props.price}</strong></p>
                <p>Burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout</p>
                <Button type="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button type="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;