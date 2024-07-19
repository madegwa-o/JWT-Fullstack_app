import axios from 'axios';
import UserService from './UserService';

const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        config => {
            const token = UserService.getAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            const originalConfig = error.config;

            if (error.response) {
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await UserService.refreshToken();
                        const { token } = rs;

                        accessToken = token;

                        return axios(originalConfig);
                    } catch (_error) {
                        UserService.logout();
                        return Promise.reject(_error);
                    }
                }

                if (error.response.status === 403) {
                    UserService.logout();
                }
            }

            return Promise.reject(error);
        }
    );
};

export default setupAxiosInterceptors;
