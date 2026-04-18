import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './config.js';

export function uploadPhoto(file, onProgress) {
  return new Promise((resolve, reject) => {
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `spaces/${timestamp}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(progress);
        },
        (error) => reject(new Error(error.message || 'Upload failed')),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    } catch (error) {
      reject(new Error(error.message || 'Upload failed'));
    }
  });
}
