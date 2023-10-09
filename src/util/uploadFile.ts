import axios from "axios";

export const uploadCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce-book");
  formData.append("cloud_name", "dvlbv6l2k");
  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dvlbv6l2k/image/upload",
    formData
  );
  return { public_id: data.public_id, url: data.url };
};

export const destroyCloudinary = async (publicId: string) => {
  console.log(process.env);

  const { data } = await axios.get(
    `https://api.cloudinary.com/v1_1/dvlbv6l2k/image/destroy?api_key=${process.env.REACT_APP_API_KEY_CLOUDINARY}&public_id=${publicId}`
  );
  console.log({ data });
  if (data.result === "ok") {
    console.log("delete image successfully");
  }
};
