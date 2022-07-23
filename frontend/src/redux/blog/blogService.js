import axios from 'axios';

const API_URL = 'https://api.braga.com.ng/api/v2/blog';

//  Get single room details
const getAllBlogPost = async () => {
  const response = await axios.get(`${API_URL}`);
  if (response.data) {
    localStorage.setItem('posts', JSON.stringify(response.data));
  }
  return response.data;
};
//  Get single room details
const getSingleBlogPost = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const blogService = {
  getAllBlogPost,
  getSingleBlogPost,
};

export default blogService;
