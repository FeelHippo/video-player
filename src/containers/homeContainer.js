import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import Home from '../components/home/home';
import {
    getDefaultVideos,
    searchVideos,
    clearSnackbar,
} from '../store/actions/index.js';
import LocalStorage from '../services/storage';
const { allUserFavorites } = LocalStorage;

export class VideoHome extends Component {
    constructor(props) {
        super();
        this.state = {
            redirect: false,
            allFavorites: [],
        }
    }

    async componentDidMount() {
        await this.props.getPopularVideos(this.props.session.token);
        // snackbar errors
        if (this.props.snackbar.message) {
            this.props.enqueueSnackbar(this.props.snackbar.message);
            this.props.clearSnackbar();
        }
        await this.userFavorites();
    }

    userFavorites = async () => {
        const localStored = await allUserFavorites();
        const allFavorites = this.props.videos.contents.filter(video => {
            return localStored.indexOf(JSON.stringify(video.id)) > 0;
        });
        this.setState({
            allFavorites
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/${this.state.userSearch}`} />
        }
        return (
            <Home 
                videos={this.props.videos.contents}
                searchVideos={this.searchVideos}
                favoriteVideos={this.state.allFavorites}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        session: state.session,
        videos: state.videos,
        redirect: state.redirect,
        snackbar: state.snackbar,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchCustomVideos: params => dispatch(searchVideos(params)),
        getPopularVideos: token => dispatch(getDefaultVideos(token)),
        clearSnackbar: () => dispatch(clearSnackbar()),
    }
}

export default withSnackbar (
    connect (
        mapStateToProps,
        mapDispatchToProps
    ) (VideoHome)
)