import Cookies from 'js-cookie';

const COOKIE_NAME = process.env.REACT_APP_COOKIE_NAME;

const setToken = (token) =>{
    Cookies.set(COOKIE_NAME, token, { expires: 7, secure: true, sameSite: 'strict' });
};

const getToken = () =>{
    return Cookies.get(COOKIE_NAME) || null;
}

const removeToken = () =>{
    Cookies.remove(COOKIE_NAME);
}

export { setToken, getToken, removeToken };