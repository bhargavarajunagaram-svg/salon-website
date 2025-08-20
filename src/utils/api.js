import axios from 'axios';
import Account from "./pages/Account";

const API_BASE_URL = 'https://api.yoursalon.com'; // Replace with your actual API base URL

// Function to handle API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
        const config = {
            method,
            url: `${API_BASE_URL}${endpoint}`,
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

// Authentication functions
export const login = async (credentials) => {
    return await apiCall('/auth/login', 'POST', credentials);
};

export const register = async (userData) => {
    return await apiCall('/auth/register', 'POST', userData);
};

// Services functions
export const fetchServices = async () => {
    return await apiCall('/services');
};

export const fetchServiceDetails = async (serviceId) => {
    return await apiCall(`/services/${serviceId}`);
};

// Appointment functions
export const bookAppointment = async (appointmentData) => {
    return await apiCall('/appointments', 'POST', appointmentData);
};

// Blog functions
export const fetchBlogPosts = async () => {
    return await apiCall('/blog');
};

export const fetchBlogPostDetails = async (postId) => {
    return await apiCall(`/blog/${postId}`);
};

// Route configuration
<Route path="/account" component={Account} />