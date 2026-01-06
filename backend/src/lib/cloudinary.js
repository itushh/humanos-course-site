import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSignedUrl = (publicId, expiresInSeconds, clientIp) => {
  const now = Math.floor(Date.now() / 1000);

  return cloudinary.url(publicId, {
    resource_type: "video",
    type: "authenticated",
    sign_url: true,
    format: "m3u8", //HLS
    streaming_profile: "auto", //adaptive bitrates

    auth_token: {
      key: process.env.CLOUDINARY_AUTH_TOKEN_SECRET,
      start_time: now,
      expiration: now + expiresInSeconds,
      ip: clientIp,
    },
  });
};

export { cloudinary, generateSignedUrl };
