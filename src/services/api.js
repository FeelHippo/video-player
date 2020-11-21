import axios from 'axios';
const md5 = require('md5');
const video_api_key = '563492ad6f91700001000001b264bbb360394d69be63de59447d1d56';

const api = (API_URL = `http://localhost:5000`, VIDEO_API = `https://api.pexels.com/videos`) => {
    return {
        defaultUser: async () => {
            const API_END = 'https://dev.perseo.tv/ws/Login.php';

            const credentials = new FormData();
            credentials.append('user', 'developer@perseo.tv');
            credentials.append('pass', md5('dev'));
            credentials.append('device', 'Web');

            try {
                const result = await axios.post(
                    API_END,
                    credentials,
                );
                return result.data;
            } catch (error) {
                console.log(error);
            }
        },
        getInitialVideos: async token => {
            const API_END = 'https://dev.perseo.tv/ws/GetView.php';

            const params = new FormData();
            params.append('token', token);
            params.append('device', 'Web');

            try {
                let response = await axios.post(
                    API_END, 
                    params,
                );
                return response.data;
            } catch (error) {
                console.log(error);
            }
        },
        getVideo: async (id, token) => {
            const API_END = 'https://dev.perseo.tv/ws/Play.php';

            const video = new FormData();
            video.append('token', token);
            video.append('device', 'Web');
            video.append('id', id);

            try {
                let response = await axios.post(
                    API_END,
                    video,
                )
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default api;