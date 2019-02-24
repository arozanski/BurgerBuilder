import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label} - ({props.amount})</div>
            <button 
                disabled={props.disabled}
                className={classes.Less}
                onClick={props.removed}>-</button>
            <button 
                className={classes.More}
                onClick={props.added}>+</button>
        </div>
    );
};

export default buildControl;