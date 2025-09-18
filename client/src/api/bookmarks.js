import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/bookmarks';

export const getBookmarks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
};

export const getBookmark = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookmark:', error);
    throw error;
  }
};

export const createBookmark = async (bookmarkData) => {
  try {
    const response = await axios.post(API_BASE_URL, bookmarkData);
    return response.data;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
};

export const updateBookmark = async (id, bookmarkData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, bookmarkData);
    return response.data;
  } catch (error) {
    console.error('Error updating bookmark:', error);
    throw error;
  }
};

export const deleteBookmark = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    throw error;
  }
};
