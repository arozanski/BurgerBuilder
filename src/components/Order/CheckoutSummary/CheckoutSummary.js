import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    const ingredients = props.ingredients ? <Burger ingredients={props.ingredients}/> : null;
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Your burger: £{Number.parseFloat(props.price).toFixed(2)}</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                {ingredients}
            </div>
            <Button 
                type="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button 
                type="Success"
                clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;