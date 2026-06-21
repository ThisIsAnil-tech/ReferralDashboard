import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REFERRALS_ENDPOINT = process.env.REACT_APP_REFERRALS_ENDPOINT;
const cookie = process.env.REACT_APP_COOKIE_NAME;

const getReferrals = async (searchQuery = '', sortOrder = 'desc') => {
    const token = Cookies.get(cookie);

    let url = `${API_BASE_URL}${REFERRALS_ENDPOINT}`;

    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (sortOrder) params.append('sort', sortOrder);
    if ([...params].length > 0) url += `?${params.toString()}`;

    const options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch referrals');
    }

    return data;
};

const getReferralById = async (id) => {
    const token = Cookies.get(cookie);
    const url = `${API_BASE_URL}${REFERRALS_ENDPOINT}?id=${id}`;

    const options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch referral details');
    }

    return data;
};

export { getReferrals, getReferralById };