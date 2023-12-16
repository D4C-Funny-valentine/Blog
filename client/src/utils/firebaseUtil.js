import { v4 } from "uuid";
import { storage } from "../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (image) => {
  const imageRef = ref(storage, `images/${image.name + v4()}`);
  const imageRes = await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(imageRes.ref);
  console.log(imageUrl);
  return imageUrl;
};
