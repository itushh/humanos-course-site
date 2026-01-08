import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config()

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_AUTH_TOKEN_SECRET,
} = process.env;

if (
  !CLOUDINARY_CLOUD_NAME ||
  !CLOUDINARY_API_KEY ||
  !CLOUDINARY_API_SECRET ||
  !CLOUDINARY_AUTH_TOKEN_SECRET
) {
  throw new Error("Cloudinary environment variables are missing");
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
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
