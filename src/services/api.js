import axios from 'axios';
const video_api_key = '563492ad6f91700001000001b264bbb360394d69be63de59447d1d56';

const api = (API_URL = `http://localhost:5000`, VIDEO_API = `https://api.pexels.com/videos`) => {
    return {
        registerUser: async ({ username, email, password }) => {
            const API_END = `${API_URL}/user/register`;

            try {
                const responseBody = await axios.post(
                    API_END,
                    {
                        username,
                        email,
                        password,
                    },
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                )

                return responseBody;
            } catch (error) {
                console.error(error);
            }
        },
        loginUser: async ({ username, password }) => {
            const API_END = `${API_URL}/user/login`;

            try {
                const responseBody = await axios.post(
                    API_END,
                    {
                        username,
                        password,
                    },
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                )

                return responseBody;
            } catch (error) {
                console.error(error);
            }
        },
        tokenAuthentication: async token => {
            const API_END = `${API_URL}/tokenIsValid`;

            try {
                let response = await axios.post(
                    API_END,
                    null,
                    {
                        headers: {
                            "x-auth-token": token
                        }
                    }
                );
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        getInitialVideos: async () => {
            const API_END = `${VIDEO_API}/popular?per_page=15`;

            try {
                let response = await axios.get(
                    API_END, 
                    {
                        headers: {
                          authorization: video_api_key
                        }
                    }
                );
                return response.data;
            } catch (error) {
                console.log(error);
            }
        },
        getSearchVideos: async params => {
            const API_END = `${VIDEO_API}/search${params}`;

            try {
                let response = await axios.get(
                    API_END,
                    {
                        headers: {
                            authorization: video_api_key
                        }
                    }
                );
                return response.data;
            } catch (error) {
                console.log(error);
            }
        },
        getVideo: async id => {
            const API_END = `${VIDEO_API}/videos/${id}`;

            try {
                let response = await axios.get(
                    API_END,
                    {
                        headers: {
                            authorization: video_api_key
                        }
                    }
                )
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default api;