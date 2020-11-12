import React, { Component, Fragment } from 'react';

export default class ErrorCatch extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error.stack)
        console.log(error.error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <Fragment>
                    <h1 class="animate__hinge">Mammamia! Something went wrong!</h1>
                    <button onClick={this.setState({ hasError: null })} >Try Again!</button>
                </Fragment>
            )
        } else {
            return this.props.children
        }
    }
}