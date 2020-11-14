import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
    getDefaultVideos,
    searchVideos,
    clearSnackbar,
} from '../store/actions/index.js';

import Home from '../components/home';

export class VideoHome extends Component {
    constructor(props) {
        super();
        this.state = {
            redirect: false,
        }
    }

    componentDidMount() {
        this.props.getDefaultVideos();
        // snackbar errors
        if (this.props.snackbar.message) {
            this.props.enqueueSnackbar(this.props.snackbar.message);
            this.props.clearSnackbar();
        }
    }

    searchVideos = async values => {
        let response = await this.props.searchVideos(values);
        if (response.msg) {
            this.props.enqueueSnackbar(response.msg);
            this.props.clearSnackbar();
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/${this.state.userSearch}`} />
        }
        return (
            <Home 
                videos={this.props.ads}
                searchVideos={this.searchVideos}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        videos: state.videos,
        redirect: state.redirect,
        snackbar: state.snackbar,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchVideos: params => dispatch(searchVideos(params)),
        getDefaultVideos: () => dispatch(getDefaultVideos()),
        clearSnackbar: () => dispatch(clearSnackbar()),
    }
}

export default withSnackbar (
    connect (
        mapStateToProps,
        mapDispatchToProps
    ) (VideoHome)
)