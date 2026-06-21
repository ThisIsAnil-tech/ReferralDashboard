const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;

const signIn = async (email, password) => {
    const url = `${API_BASE_URL}${AUTH_ENDPOINT}`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
};

export { signIn };