import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIng = Object.keys(props.ingredients).map(ingredient => {
        if (ingredient !== 'price') {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient + i} type={ingredient} />
            });
        } else return null;
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIng.length === 0) {
        transformedIng = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIng}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;