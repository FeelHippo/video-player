import { home, details, shared } from '../types/types';
import { store } from '../../index';
import api from '../../services/api';

const {
    getVideos,
    getVideo,
    getInitialVideos,
    registeredUser,
} = api();

const showSnackbar = message => ({
    return dispatch => {
        dispatch({
            type: shared.SNACKBAR_CLEAR,
        })
    }
})

export const searchVideos = ({
    query, locale, per_page
}) => {
    return async dispatch => {
        try {
            // fix this
            let API_ARGS = `?...`;
            let results = await getVideos(API_ARGS);
            if (!results.msg) {
                dispatch(fetchVideos(results))
            }
            return results;
        } catch (error) {
            console.log(error)
        }
        return 'done';
    }
}

export const getDefaultVideos = () => {
    return async dispatch => {
        try {
            await getInitialVideos().then(videos => dispatch(fetchVideos(videos)))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOneVideo = videoID => {
    return async dispatch => {
        try {
            await getVideo(videoID).then(result => {
                let videoDetails = {
                    _id: videoID,
                    // fix this with API data json
                }
                dispatch(fetchVideos(videoDetails));
            })
        } catch (error) {
            console.log(error)
        }
        return 'done';
    }
}

const fetchVideos = videos => ({
    type: home.FETCH_VIDEOS,
    payload: videos,
})