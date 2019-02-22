import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1,
    meat: 1.5,
    bacon: 1.4
}

class BuilderBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount = () => {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data})
            })
            .catch(error => console.log(error))
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer : {
                name: 'Armand',
                address: '69 Shortmead Drive',
                postcode: 'En8 8TY',
            },
            deliveryMethod: 'collection'
        }
        axios.post('/orders.json', order)
            .then(response => {
                setTimeout(() => {
                    this.setState({loading: false, purchasing: false});
                }, 0);
            })
            .catch(error => this.setState({loading: false, purchasing: false}));
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(ingredient => {
                return ingredients[ingredient]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabled = {
            ...this.state.ingredients
        };

        let burger = this.state.ingredients ? <Burger ingredients={this.state.ingredients}/> : 
            <p>Fetching ingredients</p>;

        let orderSummary = <OrderSummary 
                                price={this.state.totalPrice.toFixed(2)}
                                ingredients={this.state.ingredients}
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
                    price={this.state.totalPrice}
                    disabled={disabled}
                    ordered={this.purchaseHandler}
                    purchaseable={this.state.purchaseable}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Aux>
        );
    }    
}

export default withErrorHandler(BuilderBuilder, axios);