import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file"); // or .single("resume") if your field is named "resume"