import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getOneVideo
} from '../store/actions/index';
import LocalStorage from '../services/storage';
import PrintDetail from '../components/detail/detail';
const {
    saveFavoriteStorage,
    eraseFavoriteStorage,
    readFavoriteStorage,
} = LocalStorage;

export class VideoDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            authenticated: false,
            favorite: false,
        }
    }

    componentDidMount() {
        // fetch data from the API
        const {match: {params}} = this.props;
        this.getDetails(params.id);
        // authentication check
        const storageToken = LocalStorage.readTokenStorage();
        const storeToken = this.props.session.token;

        let authenticated = storageToken === storeToken;

        let isFavorite = readFavoriteStorage(params.id);

        this.setState({ authenticated, favorite: isFavorite });
    }

    getDetails = detId => {
        this.props.getOneVideo(detId);
    }

    toggleFavorite = () => {
        const {match: {params}} = this.props;
        if (!this.state.favorite) {
            saveFavoriteStorage(params.id);
        } else {
            eraseFavoriteStorage(params.id);
        }
        this.setState({
            favorite: !this.state.favorite
        })
    }

    render() {
        return (
            <PrintDetail 
                video={this.props.videos}
                authenticated={this.state.authenticated}
                markFavorite={this.toggleFavorite}
                favorite={this.state.favorite}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        videos: state.videos,
        session: state.session,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOneVideo: id => dispatch(getOneVideo(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoDetail);