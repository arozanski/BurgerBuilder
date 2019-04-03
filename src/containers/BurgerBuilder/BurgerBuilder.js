import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

class BuilderBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount = () => {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        this.props.onOrderInit();
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    }

    updatePurchaseState (ingredients) {
        let canPurchase = false;
        let sum = 0;

        if (ingredients) {
            sum = Object.keys(ingredients).map(ingredient => {
                return ingredients[ingredient]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

            canPurchase = sum > 0;
        }

        return canPurchase;
    }

    render () {
        const disabled = {
            ...this.props.ings
        };

        let burger = this.props.ings ? <Burger ingredients={this.props.ings}/> : 
            <p>Fetching ingredients</p>;

        let orderSummary = <OrderSummary 
                                price={this.props.price.toFixed(2)}
                                ingredients={this.props.ings}
                                purchaseCancel={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}/>;

        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }

        if (this.state.loading) {
            orderSummary = <Loader />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                <BuildControls 
                    price={this.props.price}
                    disabled={disabled}
                    ingredients={this.props.ings}
                    ordered={this.purchaseHandler}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved}/>
            </Aux>
        );
    }    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(actionTypes.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actionTypes.removeIngredient(name)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onOrderInit: () => dispatch(actionTypes.orderInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BuilderBuilder, axios));