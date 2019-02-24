import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredinetName in props.ingredients) {
        if (ingredinetName !== 'price') {
            ingredients.push({
                name: ingredinetName, 
                amout: props.ingredients[ingredinetName]
            });
        }
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name}>{ig.name} ({ig.amout}); </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: £{Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    );
};

export default order;