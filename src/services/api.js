import axios from 'axios';

const api = (API_URL = `http://localhost:5000`) => {
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
            const URL_END = `${API_URL}/tokenIsValid`;

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
        }
    }
}