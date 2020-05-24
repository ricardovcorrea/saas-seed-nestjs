import axios from 'axios';

export default () => {
    return {
        login: async (params: any) => {
            const url = `core/auth/login`;

            const { username, password } = params;

            try {
                const loginResponse = await axios.post(url, { email: username, password });
                
                localStorage.setItem('token', loginResponse.data.access_token);
                localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

            } catch (error) {
                if (error && error.response && error.response.data.message) {
                    throw error.response.data.message;
                }
                throw "An error has occured!";
            }
        },
        logout: async () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        checkAuth: async () => { 
            const token = localStorage.getItem('token');
            if(!token) {
                throw {
                    message: "You need to login again!"
                };
            }
        },
        checkError: (error:any) => Promise.resolve(),
        getPermissions: (params:any) => Promise.resolve(),
    }
};