import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button
        className={[classes.Button, classes[props.type], props.className].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}
    </button>
);

export default button;