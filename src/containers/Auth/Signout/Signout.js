import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Signout extends Component {
    componentDidMount () {
        this.props.onSignout(this.props.history);
    }

    render () {
        return (<Redirect to='/' />);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignout: () => dispatch(actions.signOut())
    }
}

export default connect(null, mapDispatchToProps)(Signout);