const LocalStorage = {
    /**
    * Save session to local storage
    */
    saveLocalStorage: session => {
        localStorage.setItem('session', JSON.stringify(session));
    },
    /**
    * Retrieve session from local storage 
    */
    readLocalStorage: () => {
        const session = localStorage.getItem('session');
        return JSON.parse(session);
    },
    /**
    * Save or delete favorite to local storage
    */
    saveFavoriteStorage: videoID => {
        localStorage.setItem(`favorite-${videoID}`, JSON.stringify(videoID));
    },
    eraseFavoriteStorage: videoID => {
        localStorage.removeItem(`favorite-${videoID}`);
    },
    /**
    * Retrieve favorite from local storage 
    */
    readFavoriteStorage: videoID => {
        const session = localStorage.getItem(`favorite-${videoID}`);
        return JSON.parse(session) === videoID ? true : false;
    },
    /**
    * get all user's favs
    */
    allUserFavorites: () => {
        let allFavorites = [];
        for (let [key, value] of Object.entries(localStorage)) {
            if (key.split('-')[0] === 'favorite') {
                allFavorites.push(value);
            }
        }
        return allFavorites;
    },
    /**
    * Set Token 
    */
    setTokenStorage: token => {
        localStorage.setItem('x-auth-token', token);
    },
    /**
    * Read Token 
    */
    readTokenStorage: () => {
        const token = localStorage.getItem('x-auth-token');
        return token;
    },
    /**
    * Clear local storage 
    */
    clearLocalStorage: () => {
        localStorage.clear();
    }
}

export default LocalStorage;