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
        await this.props.getPopularVideos();
        // snackbar errors
        if (this.props.snackbar.message) {
            this.props.enqueueSnackbar(this.props.snackbar.message);
            this.props.clearSnackbar();
        }
        await this.userFavorites();
    }

    searchVideos = async values => {
        let response = await this.props.searchCustomVideos(values);
        if (response.msg) {
            this.props.enqueueSnackbar(response.msg);
            this.props.clearSnackbar();
        }
    }

    userFavorites = async () => {
        const localStored = await allUserFavorites();
        const allFavorites = this.props.videos.filter(video => {
            return localStored.some(stored => parseInt(stored) === video.id)
        })
        console.log('favorites', allFavorites)
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
                videos={this.props.videos}
                searchVideos={this.searchVideos}
                favoriteVideos={this.state.allFavorites}
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
        searchCustomVideos: params => dispatch(searchVideos(params)),
        getPopularVideos: () => dispatch(getDefaultVideos()),
        clearSnackbar: () => dispatch(clearSnackbar()),
    }
}

export default withSnackbar (
    connect (
        mapStateToProps,
        mapDispatchToProps
    ) (VideoHome)
)