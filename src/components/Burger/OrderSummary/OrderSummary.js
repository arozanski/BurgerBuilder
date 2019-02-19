import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredient => {
            return props.ingredients[ingredient] > 0 ? <li key={ingredient}><span style={{textTransform: "capitalize"}}>
                    {ingredient}</span>: {props.ingredients[ingredient]}</li> : null;
        });

    return (
        <Aux>
            <h3>Your order</h3>
            <p>Total price: <strong>£{props.price}</strong></p>
            <p>Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout</p>
            <Button type="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button type="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;