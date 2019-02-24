import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount () {
            this.request = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request
            });

            this.response = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.request);
            axios.interceptors.response.eject(this.request);
        }
        
        errorHandler = (error) => {
            this.setState({error: error});
        }

        render () {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorHandler}>
                        {this.state.error ?this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;