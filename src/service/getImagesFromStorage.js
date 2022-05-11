import { getStorage, ref, getDownloadURL } from "firebase/storage";

export function addDownloadURL(photoURL) {
  const storage = getStorage();
  return getDownloadURL(ref(storage, photoURL));
}
