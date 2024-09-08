import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {
  const metadata = {
    // contentType: ['image/jpeg', 'image/png', 'image/jpg'],
  };

  // Create a reference with a unique name based on date and file name
  const date = new Date();
  const storageRef = ref(storage, `images/${date.getTime()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track progress of the upload
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle errors during the upload process
        switch (error.code) {
          case 'storage/unauthorized':
            reject("User doesn't have permission to access the object.");
            break;
          case 'storage/canceled':
            reject('User canceled the upload.');
            break;
          case 'storage/unknown':
            reject('Unknown error occurred: ' + error.serverResponse);
            break;
          default:
            reject('Something went wrong! Error code: ' + error.code);
        }
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
