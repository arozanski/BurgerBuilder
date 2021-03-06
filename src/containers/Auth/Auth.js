import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import { Redirect } from 'react-router-dom';
import { validate } from '../../shared/formValidation';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 5,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                rules: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignin: true
    }

    onChangeHandler = (event, name) => {
        const udpatedControls = {
            ...this.state.controls,
            [name]: {
                ...this.state.controls[name],
                value: event.target.value,
                valid: validate(event.target.value, this.state.controls[name].rules),
                touched: true
            }
        }

        this.setState({controls: udpatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignin);
    }

    onSwitchHandler = () => {
        this.setState((prevState) => {
            return { isSignin: !this.state.isSignin };
        });
    }

    componentDidMount () {
        if (!this.props.creatingOrder && this.props.authRedirectPath !== '/') {
            this.props.onAuthRedirectPath();
        }
    }
    
    render () {
        const formElements = [];
        const header = this.state.isSignin ? 'Sign in' : 'Sign up';
        const labelPartial = this.state.isSignin ? 'sign up' : 'sign in';

        if (this.props.isAuth) {
            return <Redirect to ={this.props.authRedirectPath} />;
        }

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(element => {
            return <Input 
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        touched={element.config.touched}
                        shouldValidate={element.config.rules && element.config.rules.required}
                        change={(event) => this.onChangeHandler(event, element.id)} />
        });

        if (this.props.loading) {
            return <Loader />;
        }

        let errorMsg = null;

        if (this.props.error) {
            errorMsg = <p>{this.props.error.message}</p>
        }

        return (
            <div className={styles.Auth}>
                <h3>{header}</h3>
                {errorMsg} 
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type="Success">Submit</Button>
                </form>
                <Button type="Danger" clicked={this.onSwitchHandler}>Switch to {labelPartial}</Button>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: !!state.auth.idToken,
        creatingOrder: state.burgerBuilder.creatingOrder,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignin) => dispatch(actions.auth(email, password, isSignin)),
        onAuthRedirectPath: () => dispatch(actions.authSetRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);