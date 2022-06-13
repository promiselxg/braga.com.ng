require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const removeUploadedImage = async (imageArray, preset) => {
  imageArray.map((img) =>
    cloudinary.api.delete_resources(
      `${preset}/${img}`,
      function (error, result) {
        if (error) {
          res.status(400);
          throw new Error(error);
        }
      }
    )
  );
};
module.exports = {
  cloudinary,
  removeUploadedImage,
};
