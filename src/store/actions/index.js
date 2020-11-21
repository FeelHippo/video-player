import { home, shared } from '../types/types';
import api from '../../services/api';

const {
    getSearchVideos,
    getVideo,
    getInitialVideos,
    registeredUser,
} = api();

const showSnackbar = message => ({
    type: shared.SNACKBAR_CLEAR,
    message,
})

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({
            type: shared.SNACKBAR_CLEAR,
        })
    }
}

export const searchVideos = ({
    query, locale, per_page
}) => {
    return async dispatch => {
        try {
            let API_ARGS = `?query=${query}&locale=${locale}per_page=${per_page}`;
            let results = await getSearchVideos(API_ARGS);
            if (!results.msg) {
                dispatch(fetchVideos(results.videos))
            }
            return results;
        } catch (error) {
            console.log(error)
        }
        return 'done';
    }
}

export const getDefaultVideos = token => {
    return async dispatch => {
        try {
            const videos = await getInitialVideos(token);
            dispatch(fetchVideos(videos));
            return true;
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOneVideo = (videoID, token) => {
    return async dispatch => {
        try {
            const result = await getVideo(videoID, token);
            dispatch(fetchVideos(result));
            return true;
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