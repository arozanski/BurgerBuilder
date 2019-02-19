import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a className={props.active ? classes.active : null}
            href={props.url}>
            {props.children}
        </a>
    </li>
);

export default navigationItem;