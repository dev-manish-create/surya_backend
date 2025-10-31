import cloudinaryPkg from 'cloudinary';
const cloudinary = cloudinaryPkg.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
export default {
  uploadStream(buffer, options={}) {
    return new Promise((resolve,reject)=>{
      const stream = cloudinary.uploader.upload_stream(options, (err,result)=>{
        if(err) return reject(err);
        resolve(result);
      });
      stream.end(buffer);
    });
  },
  destroy(publicId, options={}) {
    return cloudinary.uploader.destroy(publicId, options);
  }
};
