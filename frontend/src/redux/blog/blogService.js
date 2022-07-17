import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v2/blog';

//  Get single room details
const getAllBlogPost = async () => {
  const response = await axios.get(`${API_URL}`);
  if (response.data) {
    localStorage.setItem('posts', JSON.stringify(response.data));
  }
  return response.data;
};

const blogService = {
  getAllBlogPost,
};

export default blogService;
