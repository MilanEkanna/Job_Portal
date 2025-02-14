import multer from 'multer';

const storage = multer.memoryStorage();
export const singleUpload = multer({  storage }).single("file"); // This name should be same as the name we provide in signup in  type="file"