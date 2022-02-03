import { BASE_URL } from "../config/api"

export const sendsPhotoToCloudinary = async (photo) => {
  let base64Img = photo.base64;

  let response = await fetch(
    `${BASE_URL}/cloudinary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photo: base64Img,
      }),
    }
  );
  
  let json = await response.json();
  return json;
};