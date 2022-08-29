import axios from 'axios';

//const API_URL = 'https://api.braga.com.ng/api/v2/blog';
const API_URL = 'https://www.api.braga.com.ng/api/v2/gallery';

//  Get single room details
const getGallery = async () => {
  const response = await axios.get(`${API_URL}/banner`);
  return response.data;
};

const blogService = {
  getGallery,
};

export default blogService;
