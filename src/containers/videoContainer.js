import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getOneVideo
} from '../store/actions/index';
import LocalStorage from '../services/storage';
import PrintDetail from '../components/detail';

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
        this.setState({ authenticated });
    }

    componentDidUpdate(prevProps) {
        // fix this
        if (prevProps.videos.favorite !== this.props.videos.favorite) {
            this.setFavorite();
        }
    }

    getDetails = detId => {
        this.props.getOneVideo(detId);
    }

    setFavorite = () => {
        // fix this
        let isFavorite = this.props.videos.favorite.some(user => this.props.session.username === user);
        this.setState({ favorite: isFavorite });
    }

    toggleFavorite = () => {
        if (!this.state.favorite) {
            // change favorite status for this video to true
        } else {
            // change favorite status for this video to true 
        }
        this.setState({
            favorite: !this.state.favorite;
        })
    }

    render() {
        return (
            <PrintDetail 
                video={this.props.videos}
                _id={this.props.match.params.detId}
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