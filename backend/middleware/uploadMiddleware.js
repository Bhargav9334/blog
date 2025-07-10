// middleware/uploadMiddleware.js
import multer from 'multer';

const storage = multer.diskStorage({}); // No destination, handles in memory
const upload = multer({ storage });

export default upload;
